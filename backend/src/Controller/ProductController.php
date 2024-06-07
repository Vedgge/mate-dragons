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
                $projectRoot = dirname(__DIR__, 3); // Obtener la ruta absoluta de la raíz del proyecto
                $uploadsDir = $projectRoot . '/frontend/public/uploads'; // Construir la ruta completa para la carpeta de subida de archivos
                $uploadedFile->move($uploadsDir, $newFilename);
                $product->setImageUrl($newFilename);
            }

            // Guardar el producto en la base de datos
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
        // Obtener los productos de la base de datos
        $products = $this->entityManager->getRepository($this->productClass)->findAll();
        // Convertir los productos a un arreglo de datos
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
        // Devolver los datos en formato JSON
        return $this->json($data);
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function deleteProduct(Request $request): JsonResponse {
        // Obtener el ID del producto a eliminar
        $id = $request->get('id');
        // Buscar el producto en la base de datos
        $product = $this->entityManager->getRepository($this->productClass)->find($id);

        if (!$product) {
            return $this->json(['error' => 'Producto no encontrado'], 404);
        }

        // Eliminar el producto de la base de datos
        $this->entityManager->remove($product);
        // Guardar los cambios en la base de datos
        $this->entityManager->flush();

        return $this->json(['success' => true, 'message' => 'Producto eliminado exitosamente']);
    }

    #[Route('/{id}', methods: ['PUT', 'HEAD'])]
    public function updateProduct($id, Request $request): JsonResponse {
        $id = $request->get('id');
        // Obtener los datos del producto a editar
        $productData = json_decode($request->getContent(), true);
        // Buscar el producto en la base de datos
        $product = $this->entityManager->getRepository($this->productClass)->find($id);

        if (!$product) {
            return $this->json(['error' => 'Producto no encontrado'], 404);
        }

        // Actualizar los datos del producto con los datos recibidos
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
