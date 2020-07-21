<?php
class tasksController extends Controller
{
    public function index()
    {
        require(ROOT . 'models/Task.php');

        $tasks = new Task();

        if (isset($_SESSION["IS_ADMIN"])) {
            $this->set(["isAdmin" => "true"]);
        }

        $d['tasks'] = $tasks->showAllTasks();
        $this->set($d);
        $this->render("index");
    }

    public function create()
    {
        require(ROOT . 'Models/Task.php');

        $task= new Task();

        if($task->create($_POST["name"], $_POST["text"], $_POST["mail"])) {
             echo 1;
        }

    }

    public function edit($id)
    {
        if (isset($_SESSION["IS_ADMIN"])) {
            require(ROOT . 'Models/Task.php');
            $task= new Task();
            $conf = " ";
            $check = " ";

            if (isset($_POST['conf'])) {
                $conf = "Отредактировано администратором ";
            }

            if ($_POST["check"] == "true") {
                $check = "Выполнено ";
            }

            if ($task->edit($_POST["id"], $_POST["name"], $_POST["mail"], $_POST["text"], $check . $conf))
            {
                echo 1;
            }
        } else {
            echo "error";
        }

    }

    public function login()
    {
        if ($_POST["userNameLogin"] == "admin" && $_POST["userPasswordLogin"] == "123") {
            $_SESSION["IS_ADMIN"] = "true";
            echo 1;
        } else {
            print_r( ["error" =>  1]);
        }
    }

    public function logout() {
        session_destroy();
        echo 1;
    }

}