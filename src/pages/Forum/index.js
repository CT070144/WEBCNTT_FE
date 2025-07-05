import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Forum.module.scss";
import { toast } from "react-toastify";
import { Popconfirm, Modal, Tag } from "antd";
import { MessageFilled } from "@ant-design/icons";
const cx = classNames.bind(styles);


function Forum() {
    const token = localStorage.getItem("auth_token");
    const [discussions, setDiscussions] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [showAnswersFor, setShowAnswersFor] = useState(null); // discussionId
    const [answers, setAnswers] = useState([]);
    const [answerPages, setAnswerPages] = useState(1);
    const [answerPage, setAnswerPage] = useState(0);
    const [answerContent, setAnswerContent] = useState("");
    const [postingAnswer, setPostingAnswer] = useState(false);
    const [answerError, setAnswerError] = useState("");
    const [showAnswerFormFor, setShowAnswerFormFor] = useState(null); // discussionId
    const [deletingAnswerId, setDeletingAnswerId] = useState(null);
    const [deleteError, setDeleteError] = useState("");
    const urlApi = "http://localhost:8084";

    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);
    console.log(user);
    const [deletingDiscussionId, setDeletingDiscussionId] = useState(null);
    const [deleteDiscussionError, setDeleteDiscussionError] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);
    const [viewDiscussion, setViewDiscussion] = useState(null);
    const [viewDiscussionAnswers, setViewDiscussionAnswers] = useState([]);
    const [viewDiscussionLoading, setViewDiscussionLoading] = useState(false);
    const [deleteAnswerModal, setDeleteAnswerModal] = useState({ visible: false, answerId: null, discussionId: null, isOwner: false });
    useEffect(() => {
        if (user.roles.includes("ROLE_ADMIN")) {
            setIsAdmin(true);
        }
    }, [user]);
    // Fetch discussions
    const fetchDiscussions = async (page) => {
        try {
            if (page >= totalPages) return;
            setIsLoading(true);
            const response = await fetch(
                `${urlApi}/api/discussions?page=${page}&size=5`,
                {
                    method: "GET",
                    headers: token ? { Authorization: `Bearer ${token}` } : {},
                }
            );
            const data = await response.json();
            setDiscussions((prev) =>
                page === 0 ? data.content : [...prev, ...data.content]
            );
            setTotalPages(data.totalPages);
            setCurrentPage(page);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDiscussions(0);
    }, []);

    // Infinite scroll
    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.offsetHeight - 100 &&
            !isLoading &&
            currentPage + 1 < totalPages
        ) {
            fetchDiscussions(currentPage + 1);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [currentPage, isLoading, totalPages]);

    // Fetch answers for a discussion
    const fetchAnswers = async (discussionId, page = 0) => {
        setShowAnswersFor(discussionId);
        setAnswerPage(page);
        setAnswerError("");
        try {
            const response = await fetch(`${urlApi}/api/discussions/${discussionId}/answers?page=${page}`, {
                method: "GET",
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            const data = await response.json();
            setAnswers(data.content || []);
            console.log(data.content);
            setAnswerPages(data.answerPage?.totalPages || 1);
        } catch (err) {
            setAnswerError("Không thể tải câu trả lời.");
        }
    };

    // Post an answer
    const handlePostAnswer = async (discussionId) => {
        if (!answerContent.trim()) return;
        setPostingAnswer(true);
        setAnswerError("");
        try {
            const formData = new FormData();
            formData.append("content", answerContent);
            const res = await fetch(`${urlApi}/api/discussions/${discussionId}/answers`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`
                },
                body: formData
            });
            if (!res.ok) throw new Error("Gửi câu trả lời thất bại!");

            toast.success("Gửi câu trả lời thành công!");
            setAnswerContent("");
            fetchAnswers(discussionId);
            setShowAnswerFormFor(null);
            fetchDiscussions(currentPage);
        } catch (err) {
            setAnswerError(err.message || "Đã có lỗi khi gửi câu trả lời.");
        } finally {
            setPostingAnswer(false);
        }
    };

    // Delete discussion
    const handleDeleteDiscussion = async (discussionId) => {
      
        setDeletingDiscussionId(discussionId);
        setDeleteDiscussionError("");
        try {
            const res = await fetch(`${urlApi}/api/discussions/${discussionId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!res.ok) throw new Error("Xoá bài thảo luận thất bại!");
            toast.success("Đã xoá bài thảo luận!");
            setDiscussions(prev => prev.filter(d => d.discussionId !== discussionId));
        } catch (err) {
            setDeleteDiscussionError(err.message || "Đã có lỗi khi xoá bài thảo luận.");
        } finally {
            setDeletingDiscussionId(null);
        }
    };

    // Show delete answer confirmation modal
    const showDeleteAnswerModal = (answerId, discussionId, isOwner) => {
        if (!(isAdmin || isOwner)) return;
        setDeleteAnswerModal({ visible: true, answerId, discussionId, isOwner });
    };

    // Delete answer (only owner or admin)
    const handleDeleteAnswer = async () => {
        const { answerId, discussionId } = deleteAnswerModal;
        setDeletingAnswerId(answerId);
        setDeleteError("");
        try {
            const res = await fetch(`${urlApi}/api/discussions/${discussionId}/answers/${answerId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if (!res.ok) throw new Error("Xoá câu trả lời thất bại!");
            toast.success("Đã xoá câu trả lời thành công!");
            fetchAnswers(discussionId);
            setDeleteAnswerModal({ visible: false, answerId: null, discussionId: null, isOwner: false });
        } catch (err) {
            setDeleteError(err.message || "Đã có lỗi khi xoá câu trả lời.");
            toast.error(err.message || "Đã có lỗi khi xoá câu trả lời.");
        } finally {
            setDeletingAnswerId(null);
        }
    };

    // View discussion details
    const handleViewDiscussion = async (discussion) => {
        setViewDiscussion(discussion);
        setViewDiscussionLoading(true);
        try {
            const response = await fetch(`${urlApi}/api/discussions/${discussion.discussionId}/answers?page=0`, {
                method: "GET",
                headers: token ? { Authorization: `Bearer ${token}` } : {},
            });
            const data = await response.json();
            setViewDiscussionAnswers(data.content || []);
        } catch (err) {
            setViewDiscussionAnswers([]);
        } finally {
            setViewDiscussionLoading(false);
        }
    };

    return (
        <div className={cx("container")}>  
            <div className={cx("discussion-layout")}>  
                <div className={cx("discussion-list")}>  
                    <div className={cx("discussion-all")}>  
                        {discussions.map((discussion) => {
                           
                            const isOwner = user && user.entityId==discussion.author_DTO.userId;
                            return (
                            <div key={discussion.discussionId} className={cx("discussion-item")}>  
                                <div  className={cx("discussion-info")}>  
                                <span className={cx("answer-quantity")}>{discussion.answerQuantity} phản hồi</span>
                                    <div className={cx("wrapper-content")}> 
                                    <div onClick={() => handleViewDiscussion(discussion)} className={cx("discussion-title")}><MessageFilled style={{fontSize:20, paddingRight:8}}/>{discussion.title}</div>
                                    <div className={cx("discussion-content")}>{discussion.content}</div>
                                    <div className={cx("discussion-header")}>  
                                        <span className={cx("discussion-author")}>  
                                           
                                            <img src={discussion.author_DTO?.avaFileCode!=="/downloadProfile/" ? `${urlApi}${discussion.author_DTO.avaFileCode}` : "https://gist.githubusercontent.com/vinhjaxt/fa4208fd6902dd8b2f4d944fa6e7f2af/raw/454f58aeac4fdeb459476eae7128dc6ff57df25f/logo-hvktmm.png"} alt="avatar" />
                                            {discussion.author_DTO?.name} - lúc 
                                            <span>{discussion.createAt}</span>
                                        </span>
                                    </div>
                                    <div className={cx("wrapper-button")} style={{display:'flex',alignItems:'center',gap:16,marginTop:8}}>
                                       
                                        <button className={cx("show-answers-btn")}
                                            onClick={() => fetchAnswers(discussion.discussionId)}
                                        >Xem phản hồi</button>
                                        <button className={cx("reply-btn")}
                                            onClick={() => setShowAnswerFormFor(discussion.discussionId)}
                                        >Viết phản hồi</button>
                                       
                                        {(isOwner || isAdmin) && (
                                            <Popconfirm
                                                title="Bạn có chắc chắn muốn từ chối bài thảo luận này không?"
                                                onConfirm={() => handleDeleteDiscussion(discussion.discussionId)}
                                                okText="Có"
                                                cancelText="Không"
                                            >
                                                <button className={cx("delete-answer-btn")}
                                                    
                                                >Xoá</button>
                                            </Popconfirm>
                                        )}
                                    </div>
                                   
                                    {/* Hiển thị form trả lời */}
                                    {showAnswerFormFor === discussion.discussionId && (
                                        <div className={cx("answer-form")}>  
                                            <textarea
                                                className={cx("answer-textarea")}
                                                value={answerContent}
                                                onChange={e => setAnswerContent(e.target.value)}
                                                placeholder="Nhập câu trả lời..."
                                                rows={3}
                                            />
                                            <div style={{display:'flex',gap:8,marginTop:4}}>
                                                <button
                                                    className={cx("submit-answer-btn")}
                                                    onClick={() => handlePostAnswer(discussion.discussionId)}
                                                    disabled={postingAnswer}
                                                >{postingAnswer ? 'Đang gửi...' : 'Gửi'}</button>
                                                <button
                                                    className={cx("cancel-answer-btn")}
                                                    onClick={() => setShowAnswerFormFor(null)}
                                                    disabled={postingAnswer}
                                                >Huỷ</button>
                                            </div>
                                            {answerError && <div className={cx("answer-error")}>{answerError}</div>}
                                        </div>
                                    )}
                                    {/* Hiển thị danh sách câu trả lời */}
                                    {showAnswersFor === discussion.discussionId && (
                                        <div className={cx("answers-list")}>  
                                            {answerError && <div className={cx("answer-error")}>{answerError}</div>}
                                            {answers.length === 0 ? (
                                                <div className={cx("no-answers")}>Chưa có câu trả lời nào.</div>
                                            ) : (
                                                answers.map(ans => {
                                                   
                                                    const isAnswerOwner = user && user.entityId == ans.author.userId;
                                                    return (
                                                    <div key={ans.answerId} className={cx("answer-item")}>  
                                                        <div className={cx("answer-content")}> <MessageFilled style={{color:'rgb(0, 0, 0)',fontSize:20, paddingRight:8}}/>{ans.content}</div>
                                                        <div className={cx("author-info")}> 
                                                            <div className={cx("answer-author")}>  
                                                                <span>{ans.author?.name}</span>
                                                            </div>
                                                            <div className={cx("answer-meta")}>{ans.createAt}</div>
                                                        </div>
                                                        {(isAdmin || isAnswerOwner) && (
                                                            <button
                                                                className={cx("delete-answer-btn")}
                                                                onClick={() => showDeleteAnswerModal(ans.answerId, discussion.discussionId, isAnswerOwner)}
                                                                disabled={deletingAnswerId === ans.answerId}
                                                            >{deletingAnswerId === ans.answerId ? 'Đang xoá...' : 'Xoá'}</button>
                                                        )}
                                                    </div>
                                                )})
                                            )}
                                            {deleteError && <div className={cx("answer-error")}>{deleteError}</div>}
                                        </div>
                                    )}
                                </div>
                                </div>
                            </div>
                        )})}
                    </div>
                    {isLoading && <div className={cx("loading")}>Loading...</div>}
                    {currentPage + 1 >= totalPages && (
                        <div className={cx("no-more")}>No more discussions</div>
                    )}
                </div>
            </div>
            {/* Modal xem chi tiết thảo luận */}
            <Modal
                open={!!viewDiscussion}
                onCancel={() => setViewDiscussion(null)}
                title={viewDiscussion ? viewDiscussion.title : ''}
                footer={null}
                width={700}
            >
                {viewDiscussion && (
                    <div>
                        <div style={{marginBottom:8, fontWeight:500, fontStyle:'italic'}}>{viewDiscussion.content}</div>
                        <div style={{marginBottom:8}}>
                            {(viewDiscussion.tagDTOList || []).map(tag => (
                                <Tag key={tag.tagId}>{tag.tagName}</Tag>
                            ))}
                        </div>
                        <div style={{marginBottom:8, color:'#888', fontSize:13}}>
                            <img src={viewDiscussion.author_DTO?.avaFileCode ? `${urlApi}${viewDiscussion.author_DTO.avaFileCode}` : "https://gist.githubusercontent.com/vinhjaxt/fa4208fd6902dd8b2f4d944fa6e7f2af/raw/454f58aeac4fdeb459476eae7128dc6ff57df25f/logo-hvktmm.png"} alt="avatar" style={{width:22, height:22, borderRadius:4, marginRight:6, verticalAlign:'middle'}} />
                            {viewDiscussion.author_DTO?.name} - {viewDiscussion.createAt}
                        </div>
                        <div style={{marginTop:18, fontWeight:600, fontSize:16, color:'rgb(255, 0, 0)'}}>Danh sách phản hồi</div>
                        {viewDiscussionLoading ? <div>Đang tải phản hồi...</div> : (
                            viewDiscussionAnswers.length === 0 ? <div style={{color:'#888',marginTop:8}}>Chưa có phản hồi nào.</div> :
                            viewDiscussionAnswers.map(ans => (
                                <div key={ans.answerId} style={{borderBottom:'1px solid #eee',padding:'10px 0',display:'flex',alignItems:'flex-start',gap:12}}>
                                    <div style={{flex:1}}>
                                        <div style={{fontWeight:500, fontStyle:'italic'}}>{ans.content}</div>
                                        <div style={{fontSize:13,color:'#888'}}>{ans.author?.name} - {ans.createAt}</div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </Modal>

            {/* Modal xác nhận xoá phản hồi */}
            <Modal
                title="Xác nhận xoá phản hồi"
                open={deleteAnswerModal.visible}
                onOk={handleDeleteAnswer}
                onCancel={() => setDeleteAnswerModal({ visible: false, answerId: null, discussionId: null, isOwner: false })}
                okText="Xoá"
                cancelText="Huỷ"
                confirmLoading={deletingAnswerId === deleteAnswerModal.answerId}
                okButtonProps={{ 
                    danger: true,
                    style: { backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }
                }}
            >
                <p>Bạn có chắc chắn muốn xoá phản hồi này không?</p>
                <p style={{ color: '#666', fontSize: '14px', marginTop: '8px' }}>
                    Hành động này không thể hoàn tác.
                </p>
            </Modal>
        </div>
    );
}

export default Forum;
