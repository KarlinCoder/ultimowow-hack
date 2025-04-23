export const addAccount = async () => {
  const options = {
    method: "PATCH",
    headers: {
      "X-MAN-API":
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3V1aWQiOiJpVTNoc0hweWNpYTAwOWhzOURhYWxJV3ltSWoxIiwiaXNzIjoiaHR0cHM6Ly9qc29uc2lsby5jb20iLCJleHAiOjE3NDc5NjgyNzd9.lFsUpX8qs2RoHuvoU8McgSYp-DrXlL2icDfTkCR_mH4",
      "Content-Type": "application/json",
    },
    body: '{"region_name":"api","is_public":false,"file_name":"UltimoWoW Accounts","file_data":[{"username":"jaja"}]}',
  };

  fetch(
    "https://api.jsonsilo.com/api/v1/manage/7f2a91f2-6531-4bd7-a3a1-6505506c9f5e",
    options
  )
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};
