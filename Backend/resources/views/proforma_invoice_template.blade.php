<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Proforma Invoice</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 40px;
            padding: 0;
        }
        .invoice-header {
            text-align: center;
            margin-bottom: 20px;
        }
        .company-info {
            text-align: left;
            margin-bottom: 20px;
            font-size: 14px;
        }
        .invoice-details {
            width: 100%;
            margin-bottom: 20px;
            border-collapse: collapse;
        }
        .invoice-details th, .invoice-details td {
            border: 1px solid #000;
            padding: 10px;
            text-align: left;
        }
        .invoice-details th {
            background-color: #f2f2f2;
        }
        .total-section {
            text-align: right;
            font-weight: bold;
            font-size: 16px;
            margin-top: 20px;
        }
        .company-logo {
            width: 150px;
            margin-bottom: 10px;
        }
        .picture {
            width: 80px;
            height: 50px;
            object-fit: cover;
            border-radius: 5px;
        }
    </style>
</head>
<body>

    <div class="invoice-header">
        <img src="{{ asset('logo.png') }}" alt="Company Logo" class="company-logo">
        <h1>Proforma Invoice</h1>
        <p><strong>Invoice ID:</strong> {{ $OpportunityID }}</p>
        <p><strong>Date:</strong> {{ now()->format('Y-m-d') }}</p>
    </div>

    <div class="company-info">
        <p><strong>Company Name:</strong> HydotTech Ltd</p>
        <p><strong>Contact:</strong> +123-456-7890</p>
        <p><strong>Location:</strong> 123 Tech Street, Silicon Valley</p>
    </div>

    <table class="invoice-details">
        <thead>
            <tr>
                <th>S/N</th>
                <th>Picture</th>
                <th>Year</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody>
            @foreach($Vehicles as $index => $car)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>
                        @if($car['PicturePath'])
                            <img src="{{ url($car['PicturePath']) }}" class="picture">
                        @else
                            No Image
                        @endif
                    </td>
                    <td>{{ $car['Year'] }}</td>
                    <td>{{ $car['Vehicle'] }}</td>
                    <td>{{ $car['Quantity'] }}</td>
                    <td>&#8373;{{ number_format($car['UnitPrice'], 2) }}</td>
                    <td> &#8373;{{ number_format($car['UnitPrice'] * $car['Quantity'], 2) }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>

    <div class="total-section">
        <p>Total Amount: ₵{{ number_format(collect($Vehicles)->sum(fn($car) => $car['UnitPrice'] * $car['Quantity']), 2) }}</p>
    </div>

</body>
</html>
