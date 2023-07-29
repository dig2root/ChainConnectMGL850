from py3dbp import Packer, Bin, Item

class Solver3D:

    def __init__(self):
        pass

    def solve(self, containers, boxes):
        
        packer = Packer()

        # Ajout des containers
        for container in containers:
            packer.add_bin(Bin("container", container['largeur'], container['hauteur'], container['longueur'], 1000))
        
        # Ajout des éléments
        for box in boxes:
            for i in range(0, int(box['quantite'])):
                packer.add_item(Item("box", box['largeur'], box['hauteur'], box['longueur'], 0))

        # Calcul de la solution
        packer.pack(bigger_first=False, distribute_items=True)

        return packer.bins[0]