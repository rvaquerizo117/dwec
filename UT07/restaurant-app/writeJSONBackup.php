<?php

$logFile = 'Backup/debug.log';

function logMessage($message) {
    global $logFile;
    $currentTime = date('Y-m-d H:i:s');
    file_put_contents($logFile, "[$currentTime] $message\n", FILE_APPEND);
}

logMessage('Script iniciado');

// Verificar si se ha recibido el JSON correctamente
$data = json_decode(file_get_contents('php://input'), true);
if (json_last_error() !== JSON_ERROR_NONE) {
    logMessage('Error decodificando JSON: ' . json_last_error_msg());
    die('Error decodificando JSON: ' . json_last_error_msg());
}

if (isset($data['jsonObj'])) {
    logMessage('POST request received with jsonObj');

    $json = json_encode($data['jsonObj'], JSON_PRETTY_PRINT);
    
    $fecha = time();
    $campos = getdate($fecha);

    // Asumimos que la carpeta "Backup" existe
    $backupDir = 'Backup';

    $title = "$backupDir/Backup-$campos[mday]-$campos[mon]-$campos[year]-$campos[hours]_$campos[minutes]_$campos[seconds].json";

    logMessage("Generated filename: $title");

    $fd = fopen("$title", "w+");
    if ($fd) {
        fputs($fd, $json);
        fclose($fd);
        logMessage("File written successfully: $title");
        echo $title;
    } else {
        logMessage("Error al crear el archivo");
        die("Error al crear el archivo");
    }
} else {
    logMessage('No POST request received or jsonObj not set');
}
?>
