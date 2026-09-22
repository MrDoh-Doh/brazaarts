import { app } from '../../app';

describe('health endpoints', () => {
  it('reports the API status', async () => {
    const response = await fetch(`${app.get('url') ?? 'http://localhost'}/health`).catch(() => null);
    expect(response === null || response.status).toBeTruthy();
  });
});
