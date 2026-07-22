export async function askKrishiOfficer(question) {

    const response = await fetch("http://127.0.0.1:5000/ask-ai", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            question
        })

    });

    const data = await response.json();

    return data.answer;

}