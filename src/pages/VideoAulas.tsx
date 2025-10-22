import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAccessibility } from "@/contexts/AccessibilityContext";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { VIDEO_LIBRARY, getAllSubjects, getVideosBySubject, VideoLesson } from "@/lib/videoLibrary";
import { Play, Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function VideoAulas() {
  const { speak, profile: accessibilityProfile } = useAccessibility();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoLesson | null>(null);

  useEffect(() => {
    if (accessibilityProfile.ttsEnabled && !selectedVideo) {
      const timer = setTimeout(() => {
        speak("Página de vídeo aulas. Aqui você encontra uma coleção de vídeos educacionais organizados por matéria. Você pode filtrar por assunto e assistir vídeos sobre diversos tópicos de aprendizado.");
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [selectedVideo]);

  const subjects = getAllSubjects();
  const displayedVideos = selectedSubject 
    ? getVideosBySubject(selectedSubject)
    : VIDEO_LIBRARY;

  if (selectedVideo) {
    return (
      <div className="min-h-screen bg-gradient-hero">
        <Navbar />
        <main className="container mx-auto px-4 py-12 max-w-6xl">
          <Button 
            onClick={() => setSelectedVideo(null)} 
            variant="ghost" 
            className="mb-4"
          >
            ← Voltar para a lista
          </Button>
          
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="text-3xl mb-2">{selectedVideo.title}</CardTitle>
                  <CardDescription className="text-base">
                    {selectedVideo.description}
                  </CardDescription>
                </div>
                <Badge variant="secondary">{selectedVideo.subject}</Badge>
              </div>
              <div className="flex gap-4 text-sm text-muted-foreground mt-2">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {selectedVideo.duration}
                </span>
                <span>{selectedVideo.level}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full mb-6">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {selectedVideo.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-muted px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-hero">
      <Navbar />
      
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Vídeo Aulas</h1>
          <p className="text-lg text-muted-foreground">
            Aprenda com vídeos organizados por matéria
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          <Button
            variant={selectedSubject === null ? "default" : "outline"}
            onClick={() => setSelectedSubject(null)}
          >
            Todas as Matérias
          </Button>
          {subjects.map((subject) => (
            <Button
              key={subject}
              variant={selectedSubject === subject ? "default" : "outline"}
              onClick={() => setSelectedSubject(subject)}
            >
              {subject}
            </Button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedVideos.map((video) => (
            <Card 
              key={video.id} 
              className="hover:shadow-glow transition-shadow cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs">
                    {video.subject}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {video.level}
                  </Badge>
                </div>
                <CardTitle className="text-lg">{video.title}</CardTitle>
                <CardDescription>{video.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg mb-4 flex items-center justify-center relative overflow-hidden">
                  <img 
                    src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play className="h-12 w-12 text-white" />
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {video.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {video.tags.length} tópicos
                  </span>
                </div>

                <Button className="w-full">
                  <Play className="h-4 w-4 mr-2" />
                  Assistir Agora
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
