<?php
class Task extends Model
{
    /**
     * Создание новой задачи
     * @param $name
     * @param $task
     * @param $email
     * @return bool
     */
    public function create($name, $task, $email)
    {
        $sql = "INSERT INTO tasks ( user_name, user_mail, task ) VALUES (:name, :mail, :task)";

        $req = Database::getBdd()->prepare($sql);

        return $req->execute([
            'name' => $name,
            'mail' => $email,
            'task' => $task
        ]);
    }

    /**
     * Показать все задачи
     * @return array
     */
    public function showAllTasks()
    {
        $sql = "SELECT * FROM tasks ORDER by id DESC";
        $req = Database::getBdd()->prepare($sql);
        $req->execute();
        return $req->fetchAll();
    }

    /**
     * Редактирование задачи
     * @param $id
     * @param $title
     * @param $description
     * @return bool
     */
    public function edit($id, $name, $email, $task, $status)
    {
        $sql = "UPDATE tasks SET user_name = :name, task = :task, user_mail = :mail, status = :status WHERE id = :id";

        $req = Database::getBdd()->prepare($sql);

        return $req->execute([
            'id' => $id,
            'name' => $name,
            'task' => $task,
            'mail' => $email,
            'status' => $status

        ]);
    }

}