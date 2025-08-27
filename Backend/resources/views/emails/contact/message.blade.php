<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome to {{ config('app.name') }}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <style>
        /* Base Reset */
        body {
            margin: 0;
            padding: 0;
            background-color: #f4f6f9;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #333333;
        }

        .container {
            max-width: 600px;
            margin: auto;
            padding: 2rem 1rem;
            background-color: #ffffff;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.07);
        }

        .header {
            background: linear-gradient(135deg, #5a32ea, #884afc);
            padding: 2rem 1rem 1rem 1rem;
            text-align: center;
            color: white;
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
        }

        .header img {
            width: 60px;
            height: auto;
            margin-bottom: 1rem;
        }

        .header h1 {
            font-size: 1.8rem;
            margin: 0;
        }

        .body {
            padding: 1.5rem;
        }

        .body p {
            line-height: 1.6;
            margin: 1rem 0;
        }

        .credentials {
            background-color: #f0f2f8;
            border-radius: 8px;
            padding: 1rem;
            margin: 1.5rem 0;
        }

        .credentials p {
            margin: 0.5rem 0;
            font-size: 0.95rem;
        }

        .cta-button {
            display: inline-block;
            background-color: #5a32ea;
            color: white;
            text-decoration: none;
            padding: 0.75rem 1.5rem;
            border-radius: 6px;
            font-weight: 600;
            margin-top: 1.5rem;
        }

        .footer {
            text-align: center;
            font-size: 0.8rem;
            color: #999999;
            padding: 1rem;
            margin-top: 2rem;
        }

        .social-icons {
            margin-top: 1.5rem;
            display: flex;
            justify-content: center;
            gap: 1rem;
        }

        .social-icons a {
            text-decoration: none;
        }

        .social-icons img {
            width: 24px;
            height: 24px;
        }

        /* Dark Mode Support */
        @media (prefers-color-scheme: dark) {
            body {
                background-color: #121212;
                color: #f2f2f2;
            }

            .container {
                background-color: #1e1e1e;
                color: #f2f2f2;
            }

            .header {
                background: linear-gradient(135deg, #3a1fa9, #643ccc);
            }

            .credentials {
                background-color: #2a2a2a;
            }

            .footer {
                color: #888;
            }
        }

        @media only screen and (max-width: 600px) {
            .container {
                padding: 1rem;
            }
            .body {
                padding: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="https://hydottech.com/favicon.ico" alt="{{ config('app.name') }} Logo">
            <h1>Welcome to {{ config('app.name') }}!</h1>
        </div>
        <div class="body">
            <p>Hello {{ ucfirst(explode(' ', $AdminUser->Name)[0]) }},</p>

            <p>We're thrilled to welcome you to our community. You’ve been successfully registered on our platform and can now start exploring or managing events seamlessly.</p>

            <div class="credentials">
                <p><strong>Email:</strong> {{ $AdminUser->Email }}</p>
                <p><strong>Temporary Password:</strong> {{ $rawPassword }}</p>
            </div>

            <p>For your security, please log in and change your password as soon as possible.</p>

            <a href="https://events.hydottech.com" class="cta-button">Log In Now</a>

            <p>If you have any questions, feel free to reach out to us at <a href="mailto:support@hydottech.com">support@hydottech.com</a>.</p>

            <div class="social-icons">
                <a href="https://web.facebook.com/profile.php?id=100005723777034&_rdc=1&_rdr#"><img src="https://img.icons8.com/color/48/000000/facebook-new.png" alt="Facebook"></a>
                <a href="https://www.instagram.com/hydot_tech/"><img src="https://img.icons8.com/color/48/000000/instagram-new.png" alt="Instagram"></a>
                <a href="https://www.tiktok.com/@hydottechnology?lang=en"> <img src="https://img.icons8.com/color/48/000000/tiktok--v1.png" alt="TikTok"></a>
                <a href="https://www.youtube.com/@Hydot-Tech"><img src="https://img.icons8.com/color/48/000000/youtube-play.png" alt="YouTube"></a>


            </div>

            <div class="footer">
                &copy; {{ date('Y') }} {{ config('app.name') }}. All rights reserved.
            </div>
        </div>
    </div>
</body>
</html>
