import numpy as np
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
import tkinter as tk
from tkinter import ttk
from tkinter import scrolledtext

# Definir las ecuaciones paramétricas
def x(t, a, b):
    return a + b * np.cos(t)

def y(t, c, d):
    return c + d * np.sin(t)

def z(t, e, f):
    return e * t + f

def dx_dt(t, b):
    return -b * np.sin(t)

def dy_dt(t, d):
    return d * np.cos(t)

def dz_dt(e):
    return e

# Crear la interfaz principal
root = tk.Tk()
root.title("Entrada de Parámetros")
root.geometry("500x600")
root.configure(bg="#f0f0f0")

ttk.Label(root, text="Ingrese los valores del dron:", font=("Arial", 12)).pack(pady=5)

frame = ttk.Frame(root)
frame.pack(pady=10)

labels = ["Posición inicial X:", "Amplitud en X:", "Posición inicial Y:", "Amplitud en Y:", "Velocidad en Z:", "Altura inicial:", "Tiempo t:", "Obstáculo X:", "Obstáculo Y:", "Obstáculo Z:", "Posición futura T:"]
entries = []
for label in labels:
    row = ttk.Frame(frame)
    row.pack(fill='x', pady=2)
    ttk.Label(row, text=label, width=20).pack(side='left')
    entry = ttk.Entry(row)
    entry.pack(side='right', expand=True, fill='x')
    entries.append(entry)

global result_text
result_text = scrolledtext.ScrolledText(root, width=60, height=10, wrap=tk.WORD)
result_text.pack(pady=5)
result_text.insert(tk.END, "Aquí se mostrarán los mensajes...\n")

def obtener_valores():
    global a, b, c, d, e, f, t_final, obs_x, obs_y, obs_z, t_future
    a = float(entries[0].get())
    b = float(entries[1].get())
    c = float(entries[2].get())
    d = float(entries[3].get())
    e = float(entries[4].get())
    f = float(entries[5].get())
    t_final = float(entries[6].get())
    obs_x = float(entries[7].get())
    obs_y = float(entries[8].get())
    obs_z = float(entries[9].get())
    t_future = float(entries[10].get())
    result_text.insert(tk.END, "Valores confirmados. Generando trayectoria...\n")
    root.quit()

ttk.Button(root, text="Confirmar", command=obtener_valores).pack(pady=10)
root.mainloop()

# Rango de tiempo
t = np.linspace(0, t_final, 100)

def plot_trajectory(a, b, c, d, e, f, t_final, obs_x, obs_y, obs_z, t_future):
    x_vals = x(t, a, b)
    y_vals = y(t, c, d)
    z_vals = z(t, e, f)

    # Predicción de la posición en t_future
    x_future = x(t_future, a, b)
    y_future = y(t_future, c, d)
    z_future = z(t_future, e, f)

    # Velocidades en cada componente
    vx_future = dx_dt(t_future, b)
    vy_future = dy_dt(t_future, d)
    vz_future = dz_dt(e)

    # Detección de colisión
    obstacle = np.array([obs_x, obs_y, obs_z])
    distances = np.sqrt((x_vals - obstacle[0])**2 + (y_vals - obstacle[1])**2 + (z_vals - obstacle[2])**2)
    collision = np.any(distances < 0.5)
    
    mensaje_colision = "\n[COLISIÓN] " + ("\u00a1Alerta! Posible colisión detectada con el obstáculo." if collision else "No hay riesgo de colisión con el obstáculo.")
    mensaje_velocidad = f"\n[VELOCIDAD] Velocidad del dron: (Vx={vx_future:.2f}, Vy={vy_future:.2f}, Vz={vz_future:.2f}) unidades/s\n"
    mensaje_posicion = f"\n[POSICIÓN FUTURA] Posición futura del dron en t={t_future}s: ({x_future:.2f}, {y_future:.2f}, {z_future:.2f})\n"
    
    result_text.insert(tk.END, mensaje_velocidad)
    result_text.insert(tk.END, mensaje_colision)
    result_text.insert(tk.END, mensaje_posicion)
    
    # Graficar trayectoria
    fig = plt.figure()
    ax = fig.add_subplot(111, projection='3d')
    ax.plot(x_vals, y_vals, z_vals, label='Trayectoria del dron', color='b')
    ax.scatter(obstacle[0], obstacle[1], obstacle[2], color='r', marker='o', label='Obstáculo')
    ax.scatter(x_future, y_future, z_future, color='g', marker='^', label=f'Posición futura t={t_future}s')
    ax.set_xlabel('X')
    ax.set_ylabel('Y')
    ax.set_zlabel('Z')
    ax.set_title('Visualización de la trayectoria del dron')
    ax.legend()
    plt.show()

# Mostrar la trayectoria con los valores ingresados
plot_trajectory(a, b, c, d, e, f, t_final, obs_x, obs_y, obs_z, t_future)