'use client'

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'

const pieData = [
  { name: 'Pedidos', value: 300 },
  { name: 'Cancelados', value: 100 },
  { name: 'Envíos', value: 150 },
]

const COLORS = ['#2C6B33', '#1D71B8', '#F1C232']  // Colores de Quibdó

const barData = [
  { name: 'Ene', Ventas: 400 },
  { name: 'Feb', Ventas: 300 },
  { name: 'Mar', Ventas: 500 },
  { name: 'Abr', Ventas: 200 },
]

const lineData = [
  { name: 'Ene', Productos: 500 },
  { name: 'Feb', Productos: 600 },
  { name: 'Mar', Productos: 750 },
  { name: 'Abr', Productos: 400 },
]

const SellerContent = () => {
  return (
    <section className="p-6">
      {/* <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8 uppercase">
        Mis Estadísticas
      </h1> */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pie Chart */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 uppercase">Pedidos</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={90}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="top" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart for Productos */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 uppercase">Productos</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" />
              <Line type="monotone" dataKey="Productos" stroke="#2C6B33" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart for Ventas */}
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4 uppercase">Ventas por Mes</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend verticalAlign="top" />
              <Bar dataKey="Ventas" fill="#1D71B8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  )
}

export default SellerContent
