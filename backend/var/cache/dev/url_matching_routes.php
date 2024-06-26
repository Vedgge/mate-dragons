<?php

/**
 * This file has been auto-generated
 * by the Symfony Routing Component.
 */

return [
    false, // $matchHost
    [ // $staticRoutes
        '/_profiler' => [[['_route' => '_profiler_home', '_controller' => 'web_profiler.controller.profiler::homeAction'], null, null, null, true, false, null]],
        '/_profiler/search' => [[['_route' => '_profiler_search', '_controller' => 'web_profiler.controller.profiler::searchAction'], null, null, null, false, false, null]],
        '/_profiler/search_bar' => [[['_route' => '_profiler_search_bar', '_controller' => 'web_profiler.controller.profiler::searchBarAction'], null, null, null, false, false, null]],
        '/_profiler/phpinfo' => [[['_route' => '_profiler_phpinfo', '_controller' => 'web_profiler.controller.profiler::phpinfoAction'], null, null, null, false, false, null]],
        '/_profiler/xdebug' => [[['_route' => '_profiler_xdebug', '_controller' => 'web_profiler.controller.profiler::xdebugAction'], null, null, null, false, false, null]],
        '/_profiler/open' => [[['_route' => '_profiler_open_file', '_controller' => 'web_profiler.controller.profiler::openAction'], null, null, null, false, false, null]],
        '/api/login' => [[['_route' => 'api_login', '_controller' => 'App\\Controller\\AuthController::login'], null, ['POST' => 0], null, false, false, null]],
        '/api/logout' => [[['_route' => 'api_logout', '_controller' => 'App\\Controller\\AuthController::logout'], null, ['POST' => 0], null, false, false, null]],
        '/api/products' => [
            [['_route' => 'api_productsapp_product_createproduct', '_controller' => 'App\\Controller\\ProductController::createProduct'], null, ['POST' => 0], null, false, false, null],
            [['_route' => 'api_productsapp_product_getproducts', '_controller' => 'App\\Controller\\ProductController::getProducts'], null, ['GET' => 0], null, false, false, null],
        ],
        '/api/users' => [
            [['_route' => 'api_usersapp_user_getusers', '_controller' => 'App\\Controller\\UserController::getUsers'], null, ['GET' => 0], null, false, false, null],
            [['_route' => 'api_usersapp_user_createuser', '_controller' => 'App\\Controller\\UserController::createUser'], null, ['POST' => 0], null, false, false, null],
        ],
        '/api/login_check' => [[['_route' => 'api_login_check'], null, null, null, false, false, null]],
    ],
    [ // $regexpList
        0 => '{^(?'
                .'|/_(?'
                    .'|error/(\\d+)(?:\\.([^/]++))?(*:38)'
                    .'|wdt/([^/]++)(*:57)'
                    .'|profiler/(?'
                        .'|font/([^/\\.]++)\\.woff2(*:98)'
                        .'|([^/]++)(?'
                            .'|/(?'
                                .'|search/results(*:134)'
                                .'|router(*:148)'
                                .'|exception(?'
                                    .'|(*:168)'
                                    .'|\\.css(*:181)'
                                .')'
                            .')'
                            .'|(*:191)'
                        .')'
                    .')'
                .')'
                .'|/api/(?'
                    .'|products/([^/]++)(?'
                        .'|(*:230)'
                    .')'
                    .'|users/([^/]++)(?'
                        .'|(*:256)'
                    .')'
                .')'
            .')/?$}sDu',
    ],
    [ // $dynamicRoutes
        38 => [[['_route' => '_preview_error', '_controller' => 'error_controller::preview', '_format' => 'html'], ['code', '_format'], null, null, false, true, null]],
        57 => [[['_route' => '_wdt', '_controller' => 'web_profiler.controller.profiler::toolbarAction'], ['token'], null, null, false, true, null]],
        98 => [[['_route' => '_profiler_font', '_controller' => 'web_profiler.controller.profiler::fontAction'], ['fontName'], null, null, false, false, null]],
        134 => [[['_route' => '_profiler_search_results', '_controller' => 'web_profiler.controller.profiler::searchResultsAction'], ['token'], null, null, false, false, null]],
        148 => [[['_route' => '_profiler_router', '_controller' => 'web_profiler.controller.router::panelAction'], ['token'], null, null, false, false, null]],
        168 => [[['_route' => '_profiler_exception', '_controller' => 'web_profiler.controller.exception_panel::body'], ['token'], null, null, false, false, null]],
        181 => [[['_route' => '_profiler_exception_css', '_controller' => 'web_profiler.controller.exception_panel::stylesheet'], ['token'], null, null, false, false, null]],
        191 => [[['_route' => '_profiler', '_controller' => 'web_profiler.controller.profiler::panelAction'], ['token'], null, null, false, true, null]],
        230 => [
            [['_route' => 'api_productsapp_product_deleteproduct', '_controller' => 'App\\Controller\\ProductController::deleteProduct'], ['id'], ['DELETE' => 0], null, false, true, null],
            [['_route' => 'api_productsapp_product_updateproduct', '_controller' => 'App\\Controller\\ProductController::updateProduct'], ['id'], ['PUT' => 0, 'HEAD' => 1], null, false, true, null],
        ],
        256 => [
            [['_route' => 'api_usersapp_user_deleteuser', '_controller' => 'App\\Controller\\UserController::deleteUser'], ['id'], ['DELETE' => 0], null, false, true, null],
            [['_route' => 'api_usersapp_user_updateuser', '_controller' => 'App\\Controller\\UserController::updateUser'], ['id'], ['PUT' => 0, 'HEAD' => 1], null, false, true, null],
            [null, null, null, null, false, false, 0],
        ],
    ],
    null, // $checkCondition
];
