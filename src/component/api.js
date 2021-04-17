import axios from "axios";

export async function getQuestion() {
  return axios.get("https://server-dungbu.herokuapp.com/quesion").then((res) => {
    let questions = res.data;
    questions.sort(() => Math.random() - 0.5);
    return { questions };
  });
}
