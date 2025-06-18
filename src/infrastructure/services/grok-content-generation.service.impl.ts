import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { IGrokContentGenerationService } from '../../domain/services/grok-content-generation.service.interface';

interface GrokResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

@Injectable()
export class GrokContentGenerationServiceImpl
  implements IGrokContentGenerationService
{
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async generateThreadContent(
    topic: string,
    category: 'history' | 'geography',
    threadSize: number,
  ): Promise<{ title: string; posts: string[] }> {
    const prompt = this.buildPrompt(topic, category, threadSize);

    try {
      const response = await this.httpService.axiosRef.post<GrokResponse>(
        `${this.configService.get('GROK_API_URL')}/chat/completions`,
        {
          model: 'grok-beta',
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 2000,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${this.configService.get('GROK_API_KEY')}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const content = response.data.choices[0].message.content;
      return this.parseResponse(content, threadSize);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new Error(`Failed to generate content: ${errorMessage}`);
    }
  }

  private buildPrompt(
    topic: string,
    category: 'history' | 'geography',
    threadSize: number,
  ): string {
    return `Create a Twitter thread about ${topic} (${category} category) with exactly ${threadSize} posts.

Requirements:
- Each post should be engaging and informative
- Posts should be connected and tell a story
- Each post should be under 280 characters
- Include interesting facts and insights
- Make it educational but entertaining
- Use emojis sparingly but effectively

Format your response as:
TITLE: [Thread title]

POST 1: [Content]
POST 2: [Content]
...
POST ${threadSize}: [Content]

Make sure each post builds on the previous one and creates a compelling narrative.`;
  }

  private parseResponse(
    content: string,
    threadSize: number,
  ): { title: string; posts: string[] } {
    const lines = content.split('\n').filter((line) => line.trim());

    let title = '';
    const posts: string[] = [];

    for (const line of lines) {
      if (line.startsWith('TITLE:')) {
        title = line.replace('TITLE:', '').trim();
      } else if (line.startsWith('POST')) {
        const postContent = line.replace(/^POST \d+:\s*/, '').trim();
        if (postContent) {
          posts.push(postContent);
        }
      }
    }

    if (!title) {
      title = 'Interesting Facts Thread';
    }

    if (posts.length !== threadSize) {
      throw new Error(`Expected ${threadSize} posts, but got ${posts.length}`);
    }

    return { title, posts };
  }
}
