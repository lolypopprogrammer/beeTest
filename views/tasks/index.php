<div class="sort"><span>Сортировать:</span> <a href="#" id="userNameSort" onclick="sort('.userName')">имя пользователя</a> <span>/</span> <a href="#" id="userMailSort" onclick="sort('.userMail')">email</a> <span>/</span> <a href="#" id="taskStatusSort" onclick="sort('.taskStatus')">Статус</a></div>
<?php
    $count = 1;
    foreach ($tasks as $task)
    {?>
        <div class="task mb-2 mt-3 p-1" data-key='<?=$count?>'>
            <?php if (isset($isAdmin)) {?><img src=<?= 'public/img/gear.png'?> alt="gear" data-id='<?=$task['id']?>' class="settings-task"><?php }?>
            <div class="header-task">
                <table class="table table-striped custab">
                    <thead>
                    <col width="30%" valign="top">
                    <col width="30%" valign="top">
                    <col valign="top">
                    <tr class="">
                        <th class="">Имя пользователя</th>
                        <th class="">e-mail</th>
                        <th class="">Статус</th>
                    </tr>
                    </thead>
                    <tbody>
                        <?php
                        echo '<tr class="pagination-list">';
                        echo "<td class='userName'>" . htmlspecialchars($task['user_name']) . "</td>";
                        echo "<td class='userMail'>" . htmlspecialchars($task['user_mail']) . "</td>";
                        echo "<td class='taskStatus'>" . htmlspecialchars($task['status']) . "</td>";
                        echo "</tr>";
                        ?>
                    </tbody>
                </table>
            </div>
            <div class="body-task">
                <table class="table table-striped custab">
                    <thead>
                    <tr class="">
                        <th class="">Текст Задачи</th>

                    </tr>
                    </thead>
                    <tbody>
                        <?php
                        echo '<tr class="pagination-list">';
                        echo "<td class='taskDesc'>" . htmlspecialchars($task['task']) . "</td>";
                        echo "</tr>";
                        ?>
                    </tbody>
                </table>
            </div>
        </div>
<?php
        $count++;
    }
?>

<div class="row">
    <div class="col-md-12">
        <div class="justify-content-end d-flex">
            <button id="createTask" class="btn btn-primary btn-xs pull-right mb-3"><b>+</b> Создать задачу</button>

        </div>
    </div>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="pagination d-flex justify-content-center pb-3">
            <button class="btn btn-primary btn-pagination" id="prev">Предыдущая</button>
            <button class="btn-primary btn btn-pagination" id="next">Следущая</button>
        </div>
    </div>
</div>

