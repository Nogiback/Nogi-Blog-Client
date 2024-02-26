import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL;

function getUserData() {
  return JSON.parse(localStorage.getItem('user'));
}

export async function authUser(credentials) {
  const res = await axios.post(`${API_URL}/login`, credentials);
  return res.data;
}

export async function fetchAllBlogPosts() {
  const res = await axios.get(`${API_URL}/posts`);
  return res.data;
}

export async function fetchBlogPost(postID) {
  const res = await axios.get(`${API_URL}/posts/${postID}`);
  return res.data;
}

export async function fetchComments(postID) {
  const res = await axios.get(`${API_URL}/posts/${postID}/comments`);
  return res.data;
}

export async function addBlogPost(postDetails) {
  const user = getUserData();
  const res = await axios.post(`${API_URL}/posts`, postDetails, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return res.data;
}

export async function addComment(postID, comment) {
  const user = getUserData();
  const res = await axios.post(`${API_URL}/posts/${postID}/comments`, comment, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return res.data;
}

export async function deleteBlogPost(postID) {
  const user = getUserData();
  const res = await axios.delete(`${API_URL}/posts/${postID}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return res.data;
}

export async function deleteComment(postID, commentID) {
  const user = getUserData();
  const res = await axios.delete(
    `${API_URL}/posts/${postID}/comments/${commentID}`,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    },
  );
  return res.data;
}

export async function updateBlogPost(postID) {
  const user = getUserData();
  const res = await axios.put(`${API_URL}/posts/${postID}`, {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  return res.data;
}
