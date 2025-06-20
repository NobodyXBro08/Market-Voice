import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mic, MicOff, MessageCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { askGemini as generateGeminiResponse } from "@/lib/geminiClient";
import { createEmbedding, getSimilarProducts } from "@/lib/embedUtils";

const VoiceAssistant = ({ currentProduct }) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  const toggleListening = () => {
    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      toast.error("Tu navegador no soporta reconocimiento de voz");
      return;
    }

    const recognition = new SpeechRecognitionAPI();
    recognition.lang = "es-ES";
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setIsProcessing(true);
      toast.success("¡Asistente activado! Comienza a hablar...");
    };

    recognition.onerror = () => {
      setIsListening(false);
      setIsProcessing(false);
      toast.error("Hubo un error al escuchar tu voz");
    };

    recognition.onresult = async (event) => {
      const userText = event.results[0][0].transcript;
      toast.info("Procesando tu consulta...");

      try {
        const embedding = await createEmbedding(userText);
        const similarProducts = await getSimilarProducts(embedding);

        const context = similarProducts
          .map((p) => `${p.title}: ${p.description}`)
          .join("\n");

        const prompt = `El usuario preguntó: "${userText}"\n
Producto actual: ${currentProduct?.title} - ${currentProduct?.description}\n
Productos relacionados:\n${context}\n
Responde como un asesor experto en compras.`;

        const response = await generateGeminiResponse(prompt);
        setAiResponse(response);
      } catch (err) {
        toast.error("Error al obtener respuesta");
        console.error(err);
      } finally {
        setIsListening(false);
        setIsProcessing(false);
      }
    };

    recognition.start();
  };

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-purple-800">
          <Sparkles className="h-5 w-5" />
          <span>Asistente de Compras AI</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600 text-sm">
          Habla con nuestro asistente inteligente para obtener recomendaciones personalizadas,
          comparar productos y resolver todas tus dudas sobre compras.
        </p>

        <div className="flex items-center justify-center">
          <Button
            onClick={toggleListening}
            size="lg"
            className={`relative ${
              isListening
                ? "bg-red-500 hover:bg-red-600 animate-pulse"
                : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            } text-white px-8 py-4 rounded-full shadow-lg`}
          >
            {isListening ? (
              <>
                <MicOff className="h-5 w-5 mr-2" />
                Detener
              </>
            ) : (
              <>
                <Mic className="h-5 w-5 mr-2" />
                Hablar con Asistente
              </>
            )}
          </Button>
        </div>

        {isProcessing && (
          <div className="flex items-center justify-center space-x-2 text-purple-600">
            <MessageCircle className="h-4 w-4 animate-bounce" />
            <span className="text-sm">Gemini Live está escuchando...</span>
          </div>
        )}

        {aiResponse && (
          <div className="bg-white rounded-xl p-4 text-gray-800 text-sm border border-gray-300">
            <strong className="block mb-1 text-purple-700">
              Respuesta de Gemini:
            </strong>
            <p>{aiResponse}</p>
          </div>
        )}

        <div className="bg-white/50 rounded-lg p-3 text-center">
          <p className="text-xs text-gray-500">
            Powered by <strong>Gemini Live</strong> - Tecnología de voz avanzada
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoiceAssistant;
