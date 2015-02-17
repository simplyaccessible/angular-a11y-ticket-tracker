<?php

$appDir = 'http://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']).'/app';

header('Location: '.$appDir);