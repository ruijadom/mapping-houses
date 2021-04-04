export const setTokenCookie = (token: string) => {
  fetch("/api/login", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ token }),
  });
};

export const removeTokenCookie = () => {
  fetch("/api/logout", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({}),
  });
};
