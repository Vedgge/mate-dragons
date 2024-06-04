<?php
namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;


#[Route('/api/users', name: 'api_users')]
class UserController extends AbstractController{
    
    private $entityManager;
    private $userClass;

    public function __construct(EntityManagerInterface $entityManager, string $userClass)
    {
        $this->entityManager = $entityManager;
        $this->userClass = $userClass;
    }

    #[Route('', methods: ['GET'])]
    public function getUsers(): JsonResponse {
    $users = $this->entityManager->getRepository($this->userClass)->findAll();
    $userData = [];

    foreach ($users as $user) {
        $userData[] = [
            'id' => $user->getId(),
            'username' => $user->getUsername(),
            'email' => $user->getEmail(),
            'role' => $user->getRole(),
        ];
    }

    return $this->json($userData);
    }

    #[Route('', methods: ['POST'])]
    public function createUser(Request $request): JsonResponse{
        try {
            // Obtener datos del formulario
            $username = $request->request->get('username');
            $email = $request->request->get('email');
            $password = $request->request->get('password');
            $role = $request->request->get('role');

            // Crear el usuario con los datos recibidos
            $user = new User();
            $user->setUsername($username);
            $user->setEmail($email);
            $user->setPassword($password);
            $user->setRole($role);

            // Persistir el usuario en la base de datos
            $this->entityManager->persist($user);
            $this->entityManager->flush();

            return $this->json(['success' => true, 'message' => 'Usuario creado exitosamente'], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            $this->logger->error('Error al crear el usuario: ' . $e->getMessage());
            return $this->json(['error' => 'Error al crear el usuario'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function deleteUser(Request $request): JsonResponse {
        $id = $request->get('id');
        $user = $this->entityManager->getRepository($this->userClass)->find($id);

        if (!$user) {
            return $this->json(['error' => 'Usuario no encontrado'], 404);
        }

        $this->entityManager->remove($user);
        $this->entityManager->flush();

        return $this->json(['success' => true, 'message' => 'Usuario eliminado exitosamente']);
    }

    #[Route('/{id}', methods: ['PUT', 'HEAD'])]
    public function updateUser($id, Request $request): JsonResponse {

        $id = $request->get('id');
        $userData = json_decode($request->getContent(), true);
        $user = $this->entityManager->getRepository($this->userClass)->find($id);

        if (!$user) {
            return $this->json(['error' => 'Usuario no encontrado'], 404);
        }

        $user->setUsername($userData['username']);

        // Verificar si se proporcionó una nueva contraseña
        if (isset($userData['password']) && !empty($userData['password'])) {
            $user->setPassword($userData['password']);
        } else {
            // Recuperar la contraseña existente del usuario y asignarla
            $existingUser = $this->entityManager->getRepository($this->userClass)->find($id);
            $user->setPassword($existingUser->getPassword());
        }

        $user->setEmail($userData['email']);
        $user->setRole($userData['role']);

        $this->entityManager->flush();

        return $this->json(['success' => true, 'message' => 'Usuario editado exitosamente']);
    }
}