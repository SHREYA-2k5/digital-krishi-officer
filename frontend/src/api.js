export async function askKrishiOfficer(question) {

     const response = await fetch("https://digital-krishi-officer-2.onrender.com/ask-ai", {

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