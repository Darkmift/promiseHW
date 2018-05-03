<?php
$filename = 'emails.json';

if (file_exists($filename)) {
    if (filesize($filename) === 0) {
        $emailDB = json_encode(array());
    } else {
        $emailDB = file_get_contents($filename);
    }
    $emailDB = json_decode($emailDB);
    array_push($emailDB, $_POST);
    $emailDB = json_encode($emailDB,JSON_PRETTY_PRINT);
    file_put_contents($filename, $emailDB);
    echo 'email sent';
} else {
    echo "The file $filename does not exist";
}
