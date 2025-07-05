import React, { useState } from "react";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import classNames from "classnames/bind";
import styles from "./ForumStudent.module.scss";
import Forum from "~/pages/Forum";
import CreateDiscussion from "~/pages/Forum/components/CreateDiscussion";

const cx = classNames.bind(styles);

function ForumStudent() {
    const [showCreateForm, setShowCreateForm] = useState(false);

    const toggleCreateForm = () => {
        setShowCreateForm(!showCreateForm);
    };

    return (
        <div className={cx('forum-student-container')}>
            <div className={cx('header-section')}>
                <h1 className={cx('page-title')}>Diễn đàn Công nghệ thông tin</h1>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={toggleCreateForm}
                    className={cx('create-button')}
                    size="large"
                >
                    {showCreateForm ? 'Đóng' : 'Tạo bài thảo luận'}
                </Button>
            </div>

            <div className={cx('content-section')}>
                {showCreateForm && (
                    <div className={cx('create-form-container')}>
                        <CreateDiscussion />
                    </div>
                )}
                
                <div className={cx('forum-container')}>
                    <Forum />
                </div>
            </div>
        </div>
    );
}

export default ForumStudent;