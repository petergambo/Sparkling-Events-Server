/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <html>
      <head>
        <title>Sparkling Event Planners API</title>
      </head>
      <body>
        <h1>Welcome to Sparkling Event Planners Server</h1>
        <p>API Version: 1.0</p>
        <hr>
        <div>
          <strong>Status:</strong> Live <br>
          <strong>Author:</strong> Peter Aren Gambo <br>
          <strong>Client:</strong> Sparkling Event Planners Ltd. <br>
          <strong>Date:</strong> May, 2024
        </div>
      </body>
    </html>
  `;
  }
}
