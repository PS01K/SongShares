import axios from "axios";

const pinata = {
  upload: {
    file: async (formData: FormData) => {
      const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;
      const jwt = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NDI1NDhjNy03NGVjLTQ3OTAtYmE3NS01MzVhOGM5OWNkYjAiLCJlbWFpbCI6InByYXRoYW1lc2hzaHJpa2hhbmRlMDNAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6ImY0MWM1NmViYzc5MjExY2QzMjVlIiwic2NvcGVkS2V5U2VjcmV0IjoiZTY1MGM1NzQ2ZGFlZjJiMTE4MTAyNzM3ZDFmOWFmNmE5MDllMTdjMzQxMTVhMmYzODExOTMyMTQ0MWYxNjJjYSIsImV4cCI6MTgxNTc5OTkzMn0.ejpTLowWYnkpaboTptwhazWW7jh16hMgwq0BRdkZnv0";

      if (!jwt) {
        throw new Error("Pinata JWT is missing");
      }

      const response = await axios.post(url, formData, {
        maxContentLength: Infinity,
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      return response.data;
    },
  },
};

export default pinata;
