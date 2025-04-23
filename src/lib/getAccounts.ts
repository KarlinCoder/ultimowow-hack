import axios from "axios";

const url = "https://api.jsonsilo.com/7f2a91f2-6531-4bd7-a3a1-6505506c9f5e";
const headers = {
  "X-SILO-KEY": "qkBe3Lb0lyrk2mZQUC958wcQh6iZ4kCqkpqqOrhcHN",
  "Content-Type": "application/json",
};

export const getAccounts = async () => {
  const data = await axios.get(url, { headers });
  return data;
};
