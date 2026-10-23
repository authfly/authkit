<?php
// Renders the shared parity states (argv[1] = states.json) to argv[2]/<name>.html.
declare(strict_types=1);
require __DIR__ . '/../vendor/autoload.php';

function authfly_latte(): Latte\Engine
{
    $latte = new Latte\Engine();
    $latte->setTempDirectory(sys_get_temp_dir() . '/authfly-latte');
    $latte->addExtension(new Authfly\Latte\AuthflyExtension());
    return $latte;
}

function authfly_block(string $widget): string
{
    return dirname(__DIR__) . '/blocks/authfly-' . strtolower(preg_replace('/(?<!^)[A-Z]/', '-$0', substr($widget, 7))) . '.latte';
}

if (realpath($argv[0] ?? '') === __FILE__) {
    $latte = authfly_latte();
    @mkdir($argv[2], 0o755, true);
    foreach (json_decode(file_get_contents($argv[1]), true, 512, JSON_THROW_ON_ERROR) as $s) {
        file_put_contents($argv[2] . '/' . $s['name'] . '.html', $latte->renderToString(authfly_block($s['widget']), ['p' => $s['props']]));
    }
}
