<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>New Order</title>
</head>
<body>

    <img src="https://t3.ftcdn.net/jpg/02/32/62/88/360_F_232628884_45sn8uMipdksssl7QZhT4KyVasUtZthU.jpg" width="200px">

    <h2>Information order:</h2>

    <table class="table">
        <thead>
        <tr>
            <th scope="col" style="margin: 0 16px">Account name</th>
            <th scope="col" style="margin: 0 16px">Total</th>
            <th scope="col" style="margin: 0 16px">Payment status</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td style="margin: 0 16px">{{$order_latest->user->fullname}}</td>
            <td style="margin: 0 16px">{{$order_latest->total}}</td>
            <td style="margin: 0 16px">{{$order_latest->cart_status == 0 ? 'Unpaid' : 'Paid'}}</td>
        </tr>
        </tbody>
    </table>


</body>
</html>
