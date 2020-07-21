<!doctype html>
<head>
    <meta charset="utf-8">

    <title>MVC Todo</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <link rel="stylesheet" href=<?= 'public/css/main.css'?>>
    <style>

    </style>
</head>

<body>
<nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
    <a class="navbar-brand" href="">MVC Todo</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarsExampleDefault">
        <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <?php if (isset($isAdmin)) {?><a class="nav-link logout-href" href="">Выйти <span class="sr-only">(current)</span></a><?php } else {?> <a class="nav-link login-href" href="">Войти <span class="sr-only">(current)</span></a><?php }?>
            </li>
        </ul>
    </div>
</nav>

<main role="main" class="container">
    <div class="row">
        <div class="col-lg-12">
            <?php
            echo $content_for_layout;
            ?>
        </div>
    </div>
</main>
<div class="popup-container create-task">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <form class="mt-3 createTask__form" action="/mvc-ex/tasks/create" method="post" id="form-sub">
                    <h3>Создать задачу</h3>
                    <img src=<?= 'public/img/close.png'?> alt="close" class="img-close__form">
                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="userName" class="required-label">Имя пользователя</label>
                            <label for="" class="required d-none">Обязательное поле</label>
                            <input maxlength="32" type="text" class="form-control form-control-task "  name="userName" id="userName" required>
                        </div>
                        <div class="form-group col-md-6">
                            <label for="userEmail" class="required-label">e-mail</label>
                            <label for="" class="mail-req required d-none">Обязательное поле</label>
                            <input maxlength="32" type="email" class="form-control form-control-task  mail"  name="userEmail" id="userEmail" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="taskDescription" class="required-label">Текст Задачи</label>
                            <label for="" class="required d-none">Обязательное поле</label>
                            <textarea class="form-control form-control-task "  name="taskDescription" id="taskDescription" required></textarea>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary sub">Создать</button>
                </form>
            </div>
        </div>
    </div>
</div>
<div class="popup-container login">
    <div class="container">
        <div class="row">
            <div class="col-lg-6 m-auto">
                <form class="mt-3 login-user__form" action="/mvc-ex/tasks/create" method="post" id="form-sub-login">
                    <h3>ВХОД</h3>
                    <img src=<?= 'public/img/close.png'?> alt="close" class="img-close__form">
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="userNameLogin" class="required-label">Имя пользователя</label>
                            <label for="" class="required d-none">Обязательное поле</label>
                            <input maxlength="32" type="text" class="form-control form-control_login"  name="userNameLogin" id="userNameLogin" required>
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group col-md-12">
                            <label for="password" class="required-label">Пароль</label>
                            <label for="" class="required d-none">Обязательное поле</label>
                            <label for="" class="d-none required-login">Не правильное имя пользователя или пароль</label>
                            <input type="password" class="form-control form-control_login"  name="password" id="password" required/>
                        </div>
                    </div>
                    <button type="button" class="btn btn-primary login-button">Войти</button>
                </form>
            </div>
        </div>
    </div>
</div>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
<script src=<?= 'public/js/main.js'?>></script>
</body>
</html>