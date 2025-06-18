export interface IGrokContentGenerationService {
  generateThreadContent(
    topic: string,
    category: 'history' | 'geography',
    threadSize: number,
  ): Promise<{
    title: string;
    posts: string[];
  }>;
}
