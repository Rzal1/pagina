async function getFeedback(questionId) {
    try {
        const radios = document.getElementsByName(questionId);
        let selectedAnswer;
        for (const radio of radios) {
            if (radio.checked) {
                selectedAnswer = radio.value;
                break;
            }
        }
        if (!selectedAnswer) {
            alert("Selecciona una respuesta para obtener retroalimentación.");
            return;
        }
        
        const prompt = `El estudiante respondió ${selectedAnswer}. Proporciona retroalimentación.`;
        const response = await fetch('https://gemini.google.com/api/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer AIzaSyC_FUtB8P7jy2fv6PYdRscKqhVz9NYcOTs' // Asegúrate de pegar aquí tu clave API de Gemini
            },
            body: JSON.stringify({
                prompt: prompt,
                max_tokens: 50 // Puedes ajustar la longitud de la retroalimentación
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response data:', data);
        const feedbackElement = document.getElementById(`feedback-${questionId}`);
        if (data.choices && data.choices.length > 0) {
            feedbackElement.innerText = data.choices[0].text.trim();
        } else {
            feedbackElement.innerText = 'No se pudo generar la retroalimentación. Inténtalo de nuevo.';
        }
    } catch (error) {
        console.error('Error generating feedback:', error);
        document.getElementById(`feedback-${questionId}`).innerText = 'Error al generar la retroalimentación. Revisa la consola para más detalles.';
    }
}
