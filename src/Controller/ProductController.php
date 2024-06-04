<?php
namespace App\Controller;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/products', name: 'api_products')]
class ProductController extends AbstractController
{
    private $entityManager;
    private $productClass;

    public function __construct(EntityManagerInterface $entityManager, string $productClass)
    {
        $this->entityManager = $entityManager;
        $this->productClass = $productClass;
    }

    #[Route('', methods: ['POST'])]
    public function createProduct(Request $request): JsonResponse {
        try {
            // Obtener datos del formulario
            $name = $request->request->get('name');
            $brand = $request->request->get('brand');
            $type = $request->request->get('type');
            $weight = $request->request->get('weight');
            $description = $request->request->get('description');
            $price = $request->request->get('price');
            $stock = $request->request->get('stock');
            $uploadedFile = $request->files->get('image');

            // Crear el producto con los datos recibidos
            $product = new Product();
            $product->setName($name);
            $product->setBrand($brand);
            $product->setType($type);
            $product->setWeight($weight);
            $product->setDescription($description);
            $product->setPrice((int)$price);
            $product->setStock((int)$stock);

            // Manejo de la imagen
            if ($uploadedFile) {
                $newFilename = uniqid() . '.' . $uploadedFile->guessExtension();
                $uploadedFile->move(
                    $this->getParameter('kernel.project_dir') . '/frontend/public/uploads',
                    $newFilename
                );
                $product->setImageUrl($newFilename);
            }

            // Persistir el producto en la base de datos
            $this->entityManager->persist($product);
            $this->entityManager->flush();

            return $this->json(['success' => true, 'message' => 'Producto creado exitosamente'], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            $this->logger->error('Error al crear el producto: ' . $e->getMessage());
            return $this->json(['error' => 'Error al crear el producto'], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    #[Route('', methods: ['GET'])]
    public function getProducts(Request $request): JsonResponse {
        $products = $this->entityManager->getRepository($this->productClass)->findAll();
        $data = [];
        foreach ($products as $product) {
            $data[] = [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'brand' => $product->getBrand(),
                'type' => $product->getType(),
                'weight' => $product->getWeight(),
                'description' => $product->getDescription(),
                'price' => $product->getPrice(),
                'stock' => $product->getStock(),
                'image_url' => $product->getImageUrl(),
            ];
        }
        return $this->json($data);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function deleteProduct(Request $request): JsonResponse {
        $id = $request->get('id');
        $product = $this->entityManager->getRepository($this->productClass)->find($id);

        if (!$product) {
            return $this->json(['error' => 'Producto no encontrado'], 404);
        }

        $this->entityManager->remove($product);
        $this->entityManager->flush();

        return $this->json(['success' => true, 'message' => 'Producto eliminado exitosamente']);
    }

    #[Route('/{id}', methods: ['PUT', 'HEAD'])]
    public function updateProduct($id, Request $request): JsonResponse {
        $id = $request->get('id');
        $productData = json_decode($request->getContent(), true);
        $product = $this->entityManager->getRepository($this->productClass)->find($id);

        if (!$product) {
            return $this->json(['error' => 'Producto no encontrado'], 404);
        }

        $product->setName($productData['name']);
        $product->setBrand($productData['brand']);
        $product->setType($productData['type']);
        $product->setWeight($productData['weight']);
        $product->setDescription($productData['description']);
        $product->setPrice($productData['price']);
        $product->setStock($productData['stock']);

        $this->entityManager->flush();

        return $this->json(['success' => true, 'message' => 'Producto editado exitosamente']);

    }
}
