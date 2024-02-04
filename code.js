"use strict";

figma.showUI(__html__, { width: 400, height: 300 });

// Listen for messages from the UI
figma.ui.onmessage = async (pluginMessage) => {
  if (pluginMessage.cancel === 'cancel') {
    // Close the plugin when the user cancels
    figma.closePlugin();
  } else if (pluginMessage.generate === 'generate') {
    // Handle AI text generation when the 'generate' button is clicked in the UI

    // Extract the user's prompt from the message
    const prompt1 = pluginMessage.prompt;

    try {
      // Example: Using fetch to call your AI API
      // Replace with actual API call
      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add your API key or other necessary headers here
          'Authorization': 'Bearer YOUR_API'
        },
        body: JSON.stringify({
          model: "text-davinci-002", // Specify the model you're using; check OpenAI documentation for model options.
          prompt: prompt1, // The user's input prompt
          max_tokens: 100, // Maximum length of the generated text
          temperature: 0.7 // Controls randomness: lower values make the text more deterministic
        })
      });

      if (!response.ok) {
        throw new Error('Fetch to OpenAI API failed.');
      }

      const data = await response.json();
      const generatedText = data.choices[0].text; // This line is corrected

      // Send the generated text back to the UI for display
      figma.ui.postMessage({ generatedText: 'generatedText', text: generatedText });
    } catch (error) {
      console.error('Error:', error);
      // Handle the error and inform the UI
      figma.ui.postMessage({ type: 'error', message: 'Error fetching the AI-generated text.' });
    }
  }
};

