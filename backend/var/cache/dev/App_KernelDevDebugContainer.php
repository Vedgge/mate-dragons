<?php

// This file has been auto-generated by the Symfony Dependency Injection Component for internal use.

if (\class_exists(\ContainerG9bZykX\App_KernelDevDebugContainer::class, false)) {
    // no-op
} elseif (!include __DIR__.'/ContainerG9bZykX/App_KernelDevDebugContainer.php') {
    touch(__DIR__.'/ContainerG9bZykX.legacy');

    return;
}

if (!\class_exists(App_KernelDevDebugContainer::class, false)) {
    \class_alias(\ContainerG9bZykX\App_KernelDevDebugContainer::class, App_KernelDevDebugContainer::class, false);
}

return new \ContainerG9bZykX\App_KernelDevDebugContainer([
    'container.build_hash' => 'G9bZykX',
    'container.build_id' => 'a506f7cd',
    'container.build_time' => 1717776768,
    'container.runtime_mode' => \in_array(\PHP_SAPI, ['cli', 'phpdbg', 'embed'], true) ? 'web=0' : 'web=1',
], __DIR__.\DIRECTORY_SEPARATOR.'ContainerG9bZykX');
