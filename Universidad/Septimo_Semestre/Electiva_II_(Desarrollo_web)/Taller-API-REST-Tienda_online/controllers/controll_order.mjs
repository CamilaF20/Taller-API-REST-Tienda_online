import Order from "../models/Order.mjs";
import Client from "../models/Client.mjs";

// Crear un nuevo pedido
export const addOrder = async (req, res) => {
  try {
    const { clientId, products } = req.body;

    // Verificar si el cliente existe
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    // Verificar que haya productos
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Debe incluir al menos un producto" });
    }

    // Normalizar productos y calcular total
    const mappedProducts = products.map(p => ({
      name: p.nombre,
      quantity: p.cantidad,
      price: p.precio
    }));

    const total = mappedProducts.reduce((sum, p) => sum + p.quantity * p.price, 0);

    // Crear y guardar la orden
    const order = new Order({
      client: clientId,
      products: mappedProducts,
      total
    });

    await order.save();

    // Responder con información detallada
    res.status(201).json({
      msg: "✅ Pedido creado exitosamente",
      client: {
        id: client._id,
        name: client.name,
        email: client.email,
        address: client.address
      },
      products: mappedProducts,
      total
    });

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Listar pedidos de un cliente
export const listOrderClient = async (req, res) => {
  try {
    const orders = await Order.find({ client: req.params.clientId })
      .populate("client", "name email address");

    if (!orders.length) {
      return res.status(404).json({ msg: "Este cliente no tiene pedidos registrados." });
    }

    const formattedOrders = orders.map(o => ({
      id: o._id,
      client: o.client,
      products: o.products.map(p => ({
        nombre: p.name,
        cantidad: p.quantity,
        precio: p.price
      })),
      total: o.total,
      createdAt: o.createdAt
    }));

    res.json(formattedOrders);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
