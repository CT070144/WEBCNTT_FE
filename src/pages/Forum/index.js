import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Forum.module.scss";

const cx = classNames.bind(styles);

function Forum() {
    const token = localStorage.getItem("auth_token");
    const [discussions, setDiscussions] = useState([]);
    const [recentPosts, setRecentPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDiscussion, setSelectedDiscussion] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [answers, setAnswers] = useState([]);
    const [currentId, setCurrentId] = useState(null);
    const urlApi = "http://localhost:8084";

    const fetchDiscussions = async (page) => {
        try {
            if (page >= totalPages) return;
            setIsLoading(true);

            const response = await fetch(
                `${urlApi}/api/discussions?page=${page}&size=5`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();
            setDiscussions((prevDiscussions) =>
                page === 0 ? data.content : [...prevDiscussions, ...data.content]
            );

            setTotalPages(data.totalPages);
            setCurrentPage(page);
            setIsLoading(false);
        } catch (error) {
            console.error("Error fetching discussions:", error);
            setIsLoading(false);
        }
    };

    const fetchAnswer = async (discussionId) => {
        try {
            const answerResponse = await fetch(`${urlApi}/api/discussions/${discussionId}/answers?page=0`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            const dataAns = await answerResponse.json();
            setAnswers(dataAns.content)
        } catch (error) {
            console.error("Error fetching Answers:", error);
        }
    }

    const fetchRecentPosts = async (discussionId) => {
        try {
            const response = await fetch(`${urlApi}/api/discussions/latest`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setRecentPosts(data);

        } catch (error) {
            console.error("Error fetching recent posts:", error);
        }
    };

    const fetchDiscussionDetails = async (discussionId) => {
        try {
            const response = await fetch(`${urlApi}/api/discussions/${discussionId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setSelectedDiscussion(data);

            setCurrentId(discussionId);
            setIsModalOpen(true);
        } catch (error) {
            console.error("Error fetching discussion details:", error);
        }
    };

    useEffect(() => {
        fetchDiscussions(0);
        fetchRecentPosts();
    }, []);

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

    console.log(answers)

    return (
        <div className={cx("container")}>
            <h1>KMA Forum</h1>
            <div className={cx("discussion-layout")}>
                <div className={cx("discussion-list")}>
                    <div className={cx("discussion-all")}>
                        {discussions.map((discussion) => (
                            <div key={discussion.discussionId} className={cx("discussion-item")}>
                                <div className={cx("discussion-point")}>
                                    Point: {discussion.voteDTO.upVotes - discussion.voteDTO.downVotes}
                                </div>
                                <div>
                                    <div className={cx("discussion-header")}>
                                        <span className={cx("discussion-author")}>
                                            {discussion.authorName}
                                        </span>
                                    </div>
                                    <div className={cx("discussion-title")}>{discussion.title}</div>
                                    <button
                                        className={cx("detail-button")}
                                        onClick={() => fetchDiscussionDetails(discussion.discussionId)}
                                    >
                                        Xem chi tiết
                                    </button>
                                    <span>{discussion.answerQuantity} Answers</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    {isLoading && <div className={cx("loading")}>Loading...</div>}
                    {currentPage + 1 >= totalPages && (
                        <div className={cx("no-more")}>No more discussions</div>
                    )}
                </div>

                <div className={cx("recent-posts")}>
                    <div className={cx("recent-post-title")}>Recent Posts</div>
                    {recentPosts.map((post) => (
                        <div key={post.discussionId} className={cx("recent-post-item")}>
                            <div className={cx("recent-post-item-title")}>{post.title}</div>
                            <div className={cx("recent-post-item-date")}>
                                {new Date(post.createAt).toLocaleDateString()}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isModalOpen && selectedDiscussion && (
                <div className={cx("modal")}>
                    <div className={cx("modal-content")}>
                        <span className={cx("close-button")} onClick={() => setIsModalOpen(false)}>
                            &times;
                        </span>
                        <div className={cx("vote")}>
                            <i className="fa-solid fa-caret-up"></i>
                            <span>{selectedDiscussion.voteDTO.upVotes - selectedDiscussion.voteDTO.downVotes}</span>
                            <i className="fa-solid fa-caret-down"></i>
                        </div>
                        <div className={cx("content")}>
                            <div className={cx("author-info")}>
                                <img
                                    src={`${urlApi}${selectedDiscussion.author.avaFileCode}`}
                                    alt={selectedDiscussion.author.name}
                                    className={cx("author-avatar")}
                                />
                                <div className={cx("author-details")}>
                                    <strong>{selectedDiscussion.author.name}</strong>
                                    <p>{new Date(selectedDiscussion.createAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <h2>{selectedDiscussion.title}</h2>
                            <p>{selectedDiscussion.content}</p>
                            {selectedDiscussion.tagDTOList.map((tag) => (
                                <span className={cx("tag")}>{tag.tagName}</span>
                            ))
                            }
                            <div className={cx("answer")}>
                                <div className={cx("line")}></div>
                                <button onClick={() => fetchAnswer(currentId)}>Show Answers</button>
                                <div className={cx("answer-content")}>
                                    {answers.map((answer) =>
                                    (<div className={cx("answer-item")}>
                                        <div className={cx("vote")}>
                                            <i className="fa-solid fa-caret-up"></i>
                                            <span>{answer.voteDTO.upVotes - answer.voteDTO.downVotes}</span>
                                            <i className="fa-solid fa-caret-down"></i>
                                        </div>
                                        <div>
                                            <div className={cx("answer-author")}>
                                                <img src={urlApi + answer.author.avaFileCode} alt=""></img>
                                                <p>{answer.author.name}</p>
                                            </div>
                                            <div className={cx("answer-content")}>{answer.content}</div>
                                        </div>

                                    </div>)
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Forum;
