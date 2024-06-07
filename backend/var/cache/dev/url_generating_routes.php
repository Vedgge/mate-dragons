<?php

// This file has been auto-generated by the Symfony Routing Component.

return [
    '_preview_error' => [['code', '_format'], ['_controller' => 'error_controller::preview', '_format' => 'html'], ['code' => '\\d+'], [['variable', '.', '[^/]++', '_format', true], ['variable', '/', '\\d+', 'code', true], ['text', '/_error']], [], [], []],
    '_wdt' => [['token'], ['_controller' => 'web_profiler.controller.profiler::toolbarAction'], [], [['variable', '/', '[^/]++', 'token', true], ['text', '/_wdt']], [], [], []],
    '_profiler_home' => [[], ['_controller' => 'web_profiler.controller.profiler::homeAction'], [], [['text', '/_profiler/']], [], [], []],
    '_profiler_search' => [[], ['_controller' => 'web_profiler.controller.profiler::searchAction'], [], [['text', '/_profiler/search']], [], [], []],
    '_profiler_search_bar' => [[], ['_controller' => 'web_profiler.controller.profiler::searchBarAction'], [], [['text', '/_profiler/search_bar']], [], [], []],
    '_profiler_phpinfo' => [[], ['_controller' => 'web_profiler.controller.profiler::phpinfoAction'], [], [['text', '/_profiler/phpinfo']], [], [], []],
    '_profiler_xdebug' => [[], ['_controller' => 'web_profiler.controller.profiler::xdebugAction'], [], [['text', '/_profiler/xdebug']], [], [], []],
    '_profiler_font' => [['fontName'], ['_controller' => 'web_profiler.controller.profiler::fontAction'], [], [['text', '.woff2'], ['variable', '/', '[^/\\.]++', 'fontName', true], ['text', '/_profiler/font']], [], [], []],
    '_profiler_search_results' => [['token'], ['_controller' => 'web_profiler.controller.profiler::searchResultsAction'], [], [['text', '/search/results'], ['variable', '/', '[^/]++', 'token', true], ['text', '/_profiler']], [], [], []],
    '_profiler_open_file' => [[], ['_controller' => 'web_profiler.controller.profiler::openAction'], [], [['text', '/_profiler/open']], [], [], []],
    '_profiler' => [['token'], ['_controller' => 'web_profiler.controller.profiler::panelAction'], [], [['variable', '/', '[^/]++', 'token', true], ['text', '/_profiler']], [], [], []],
    '_profiler_router' => [['token'], ['_controller' => 'web_profiler.controller.router::panelAction'], [], [['text', '/router'], ['variable', '/', '[^/]++', 'token', true], ['text', '/_profiler']], [], [], []],
    '_profiler_exception' => [['token'], ['_controller' => 'web_profiler.controller.exception_panel::body'], [], [['text', '/exception'], ['variable', '/', '[^/]++', 'token', true], ['text', '/_profiler']], [], [], []],
    '_profiler_exception_css' => [['token'], ['_controller' => 'web_profiler.controller.exception_panel::stylesheet'], [], [['text', '/exception.css'], ['variable', '/', '[^/]++', 'token', true], ['text', '/_profiler']], [], [], []],
    'api_login' => [[], ['_controller' => 'App\\Controller\\AuthController::login'], [], [['text', '/api/login']], [], [], []],
    'api_logout' => [[], ['_controller' => 'App\\Controller\\AuthController::logout'], [], [['text', '/api/logout']], [], [], []],
    'api_productsapp_product_createproduct' => [[], ['_controller' => 'App\\Controller\\ProductController::createProduct'], [], [['text', '/api/products']], [], [], []],
    'api_productsapp_product_getproducts' => [[], ['_controller' => 'App\\Controller\\ProductController::getProducts'], [], [['text', '/api/products']], [], [], []],
    'api_productsapp_product_deleteproduct' => [['id'], ['_controller' => 'App\\Controller\\ProductController::deleteProduct'], [], [['variable', '/', '[^/]++', 'id', true], ['text', '/api/products']], [], [], []],
    'api_productsapp_product_updateproduct' => [['id'], ['_controller' => 'App\\Controller\\ProductController::updateProduct'], [], [['variable', '/', '[^/]++', 'id', true], ['text', '/api/products']], [], [], []],
    'api_usersapp_user_getusers' => [[], ['_controller' => 'App\\Controller\\UserController::getUsers'], [], [['text', '/api/users']], [], [], []],
    'api_usersapp_user_createuser' => [[], ['_controller' => 'App\\Controller\\UserController::createUser'], [], [['text', '/api/users']], [], [], []],
    'api_usersapp_user_deleteuser' => [['id'], ['_controller' => 'App\\Controller\\UserController::deleteUser'], [], [['variable', '/', '[^/]++', 'id', true], ['text', '/api/users']], [], [], []],
    'api_usersapp_user_updateuser' => [['id'], ['_controller' => 'App\\Controller\\UserController::updateUser'], [], [['variable', '/', '[^/]++', 'id', true], ['text', '/api/users']], [], [], []],
    'api_login_check' => [[], [], [], [['text', '/api/login_check']], [], [], []],
    'App\Controller\AuthController::login' => [[], ['_controller' => 'App\\Controller\\AuthController::login'], [], [['text', '/api/login']], [], [], []],
    'App\Controller\AuthController::logout' => [[], ['_controller' => 'App\\Controller\\AuthController::logout'], [], [['text', '/api/logout']], [], [], []],
    'App\Controller\ProductController::createProduct' => [[], ['_controller' => 'App\\Controller\\ProductController::createProduct'], [], [['text', '/api/products']], [], [], []],
    'App\Controller\ProductController::getProducts' => [[], ['_controller' => 'App\\Controller\\ProductController::getProducts'], [], [['text', '/api/products']], [], [], []],
    'App\Controller\ProductController::deleteProduct' => [['id'], ['_controller' => 'App\\Controller\\ProductController::deleteProduct'], [], [['variable', '/', '[^/]++', 'id', true], ['text', '/api/products']], [], [], []],
    'App\Controller\ProductController::updateProduct' => [['id'], ['_controller' => 'App\\Controller\\ProductController::updateProduct'], [], [['variable', '/', '[^/]++', 'id', true], ['text', '/api/products']], [], [], []],
    'App\Controller\UserController::getUsers' => [[], ['_controller' => 'App\\Controller\\UserController::getUsers'], [], [['text', '/api/users']], [], [], []],
    'App\Controller\UserController::createUser' => [[], ['_controller' => 'App\\Controller\\UserController::createUser'], [], [['text', '/api/users']], [], [], []],
    'App\Controller\UserController::deleteUser' => [['id'], ['_controller' => 'App\\Controller\\UserController::deleteUser'], [], [['variable', '/', '[^/]++', 'id', true], ['text', '/api/users']], [], [], []],
    'App\Controller\UserController::updateUser' => [['id'], ['_controller' => 'App\\Controller\\UserController::updateUser'], [], [['variable', '/', '[^/]++', 'id', true], ['text', '/api/users']], [], [], []],
];
