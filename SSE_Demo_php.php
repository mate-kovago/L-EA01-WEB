<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

// Másodperc lekérdezése
$second = date("s");

// Dobókocka érték: 1–6
$dice = ($second % 6) + 1;

// SSE formátumú válasz küldése
echo "data: Dice rolled: {$dice} (second = {$second})\n\n";
flush();
?>