<?php
$finder = Symfony\CS\Finder\DefaultFinder::create()
    ->exclude('doc')
    ->exclude('var')
    ->filter(function (SplFileInfo $file) {
        if (strstr($file->getPath(), 'compatibility')) {
            return false;
        }
    })
    ->in(__DIR__ . '/lib')
    ->in(__DIR__ . '/usr')
    ->in(__DIR__ . '/www/setup');

$config = Symfony\CS\Config\Config::create();
$config->fixers(Symfony\CS\FixerInterface::PSR2_LEVEL);
$config->finder($finder);
return $config;