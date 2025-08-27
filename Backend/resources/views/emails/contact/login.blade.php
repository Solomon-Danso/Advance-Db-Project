<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Welcome to {{ config('app.name') }}!</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f0f2f5;
      margin: 0;
      padding: 0;
    }

    .wrapper {
      display: flex;
      justify-content: center;
      padding: 40px 20px;
    }

    .card {
      max-width: 600px;
      width: 100%;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }

    .header {
      background: linear-gradient(90deg, #4e54c8, #8f94fb);
      color: #ffffff;
      text-align: center;
      padding: 30px 20px;
    }

    .header h1 {
      margin: 0;
      font-size: 1.9rem;
      font-weight: 600;
    }

    .content {
      padding: 30px 25px;
      color: #333333;
    }

    .content p {
      margin: 1.2rem 0;
      font-size: 1rem;
      line-height: 1.6;
    }

    .credentials {
      background-color: #f5f7fa;
      border: 1px solid #e1e4e8;
      border-left: 5px solid #4e54c8;
      padding: 16px 20px;
      font-size: 1.2rem;
      font-weight: bold;
      color: #4e54c8;
      margin: 1.5rem 0;
      border-radius: 6px;
      text-align: center;
    }

    .footer {
      text-align: center;
      font-size: 0.85rem;
      color: #888888;
      padding: 20px;
      border-top: 1px solid #eeeeee;
    }

    @media (max-width: 600px) {
      .card {
        margin: 0 10px;
      }
      .header h1 {
        font-size: 1.5rem;
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="card">
      <div class="header">
        <h1>Welcome to {{ config('app.name') }}</h1>
      </div>
      <div class="content">
        <p>Hello,</p>

        <p>Your one-time verification code is:</p>

        <div class="credentials">
          {{ $token }}
        </div>

        <p><strong>Note:</strong> This code will expire in 10 minutes. If you didn’t request this, please ignore this message.</p>

        <p>Thank you for choosing {{ config('app.name') }}.</p>

        <p style="margin-top: 2rem;">Best regards,<br/><strong>{{ config('app.name') }}</strong> Team</p>
      </div>
      <div class="footer">
        &copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.
      </div>
    </div>
  </div>
</body>
</html>
