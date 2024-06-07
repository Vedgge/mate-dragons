<?php
namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class AuthController extends AbstractController {
    private $entityManager;
    private $jwtManager;

    public function __construct(EntityManagerInterface $entityManager, JWTTokenManagerInterface $jwtManager) {
        $this->entityManager = $entityManager;
        $this->jwtManager = $jwtManager;
    }

    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(Request $request): JsonResponse {
        // Obtener los datos del usuario desde la solicitud
        $data = json_decode($request->getContent(), true);
        // Verificar si los datos son válidos
        $username = $data['username'] ?? null;
        $password = $data['password'] ?? null;

        if (!$username || !$password) {
            return $this->json(['message' => 'Credenciales Invalidas'], JsonResponse::HTTP_UNAUTHORIZED);
        }
        // Verificar si el usuario existe en la base de datos
        $user = $this->entityManager->getRepository(User::class)->findOneBy(['username' => $username]);

        if (!$user || $user->getPassword() !== $password) {
            return $this->json(['message' => 'Credenciales Invalidas'], JsonResponse::HTTP_UNAUTHORIZED);
        }
        // Generar el token JWT
        $token = $this->jwtManager->create($user, ['id' => $user->getId(), 'email' => $user->getEmail()]);
        // Devolver la respuesta con el token
        return $this->json([
            'token' => $token,
            'message' => 'Login exitoso',
            'user' => $user->getUserIdentifier(),
        ]);
    }

    #[Route('/api/logout', name: 'api_logout', methods: ['POST'])]
    public function logout(): JsonResponse {
        return $this->json(['message' => 'Logout exitoso']);
    }
}
