import { useEffect, useState } from "react";
import { useParams } from "react-router";

import NewComment from "./components/NewComment/NewComment";
import PostBody from "./components/PostBody";
import PostCommentFeed from "./components/PostCommentFeed/PostCommentFeed";
import PostHeader from "./components/PostHeader/PostHeader";
import PostItemOptions from "./components/PostItemOptions/PostItemOptions";

import PulseLoader from "@components/Loader/PulseLoader";

import api from "@utilities/api";
import { contactProps, funcProp, postProps } from "@utilities/propTypeDefs";

import {
  editPostFormSetup,
  editPostInitialForm,
} from "@utilities/formTemplates";

export default function PostItem({ postProp, setLoadPosts, user }) {
  const [post, setPost] = useState(null);

  const [loadPost, setLoadPost] = useState(false);
  const [loadComments, setLoadComments] = useState(true);

  const [itemHover, setItemHover] = useState(false);
  const [showItemMenu, setShowItemMenu] = useState(false);

  const [editablePost, setEditablePost] = useState(false);

  const [formData, setFormData] = useState(editPostInitialForm);
  const [submitted, setSubmitted] = useState(null);

  const { postIdParam } = useParams();

  const contentField = editPostFormSetup[0];
  const titleField = editPostFormSetup[1];

  useEffect(() => {
    async function getPost() {
      const fetch = await api.post.get(postIdParam);
      setPost(fetch);
      setLoadPost(false);
    }
    loadPost && getPost();
  }, [postIdParam, loadPost]);

  useEffect(() => {
    if (postIdParam) {
      setLoadPost(true);
    } else if (postProp) {
      setPost(postProp);
    }
  }, [postIdParam, postProp]);

  useEffect(() => {
    setFormData({...formData, ...post})
  }, [post])

  function handleHoverEnter() {
    setItemHover(true);
  }

  function handleHoverLeave() {
    setItemHover(false);
  }

  if (!post) {
    return <PulseLoader />;
  }

  return (
    <li
      onMouseEnter={handleHoverEnter}
      onMouseLeave={handleHoverLeave}
      className="post-item app-card relative flex flex-col gap-4"
    >
      <PostHeader
        post={post}
        editablePost={editablePost}
        field={titleField}
        formData={formData}
        setFormData={setFormData}
        submitted={submitted}
      />
      <PostBody
        post={post}
        editablePost={editablePost}
        field={contentField}
        formData={formData}
        setEditablePost={setEditablePost}
        setFormData={setFormData}
        setLoadPosts={setLoadPosts}
        setShowItemMenu={setShowItemMenu}
        setSubmitted={setSubmitted}
        submitted={submitted}
      />
      <PostItemOptions
        editablePost={editablePost}
        itemHover={itemHover}
        postId={post.id}
        showItemMenu={showItemMenu}
        setEditablePost={setEditablePost}
        setLoadPosts={setLoadPosts}
        setShowItemMenu={setShowItemMenu}
      />
      <PostCommentFeed
        loadComments={loadComments}
        postId={post.id}
        setLoadComments={setLoadComments}
      />
      <NewComment
        user={user}
        postId={post.id}
        setLoadComments={setLoadComments}
      />
    </li>
  );
}

PostItem.propTypes = {
  postProp: postProps,
  setLoadPosts: funcProp,
  user: contactProps,
};
