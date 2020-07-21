<?php

define("PUBLIC", str_replace("public/index.php", "", $_SERVER["SCRIPT_NAME"]));
define("ROOT", str_replace("public/index.php", "", $_SERVER["SCRIPT_FILENAME"]));

require(ROOT . 'config/core.php');
require(ROOT . 'routes/router.php');
require(ROOT . 'routes/request.php');
require(ROOT . 'routes/dispatcher.php');

$dispatch = new Dispatcher();
$dispatch->dispatch();