<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>New Comment</title>
</head>
<body>

<div style="display: flex; align-items: center; column-gap: 12px">
    <h3>Tên tài khoản: </h3>
    <h4>{{$name_user}}</h4>
</div>

<div style="display: flex; align-items: center; column-gap: 12px">
    <h3>Tên sản phẩm được bình luận: </h3>
    <h4>{{$name_product}}</h4>
</div>

<div style="display: flex; align-items: center; column-gap: 12px">
    <h3>Nội dung comment: </h3>
    <h4>{{$content}}</h4>
</div>

</body>
</html>
