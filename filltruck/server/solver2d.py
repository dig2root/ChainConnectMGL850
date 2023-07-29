from textwrap import fill
from turtle import heading, width
from rectpack import *

class Solver2D:

    def __init__(self):
        self.bin_algo_list = [PackingBin.BNF, PackingBin.BFF, PackingBin.BBF, PackingBin.Global]
        self.pack_algo_list = [MaxRectsBl, MaxRectsBssf, MaxRectsBaf, MaxRectsBlsf, SkylineBl, SkylineBlWm, SkylineMwf, SkylineMwfl, SkylineMwfWm, SkylineMwflWm, GuillotineBssfSas, GuillotineBssfLas, GuillotineBssfSlas, GuillotineBssfLlas, GuillotineBssfMaxas, GuillotineBssfMinas, GuillotineBlsfSas, GuillotineBlsfLas, GuillotineBlsfSlas, GuillotineBlsfLlas, GuillotineBlsfMaxas, GuillotineBlsfMinas, GuillotineBafSas, GuillotineBafLas, GuillotineBafSlas, GuillotineBafLlas, GuillotineBafMaxas, GuillotineBafMinas]
        self.sort_algo_list = [SORT_NONE, SORT_AREA, SORT_PERI, SORT_DIFF, SORT_SSIDE, SORT_LSIDE, SORT_RATIO]

    def solveBest(self, liste, container):

        best_bin_algo = self.bin_algo_list[0]
        best_pack_algo = self.pack_algo_list[0]
        best_sort_algo = self.sort_algo_list[0]

        width, height = container

        # ------------- Début de boucle -------------
        for bin_algo in self.bin_algo_list:
            for pack_algo in self.pack_algo_list:
                for sort_algo in self.sort_algo_list:

                    # Fonctionnement de l'ordonnancement
                    packer = newPacker(PackingMode.Offline, bin_algo=bin_algo, pack_algo=pack_algo, sort_algo=sort_algo)
                    i = 0
                    for p in liste:
                        packer.add_rect(*p)
                        i += 1
                    packer.pack() # Lancement de l'algorithme

                    #Récupération du container rempli
                    filled_container = packer

                    # Calcul de la côte maximale pour l'algorithme en cours
                    cote_max = 0
                    for palette in filled_container:
                        hauteur_palette = palette.y + palette.height
                        # Côte maximale
                        if (hauteur_palette > cote_max):
                            cote_max = hauteur_palette
                        
                    aire_palettes = 0
                    for palette in filled_container:
                        aire_palettes += palette.width*palette.height
                        
                    aire_perdu = cote_max*width - aire_palettes
                    # Condition pour choisir la meilleure combinaison de paramètres basée sur la côte maximale (on cherche à ce qu'elle soit minimale)
                    # Il faut définir les priorités d'ordonnancement
                    # Trouver la bonne combinaison de conditions n'est pas si évident
                    #((cote_max < cote_courante)&(aire_perdu < aire_courante)&(len(self.packer1) >= nombre_palette_courant))
                    if ((aire_perdu < aire_courante)&(len(filled_container) >= nombre_palette_courant)):
                        aire_courante = aire_perdu
                        cote_courante = cote_max
                        nombre_palette_courant = len(filled_container)
                        best_bin_algo = bin_algo
                        best_pack_algo = pack_algo
                        best_sort_algo = sort_algo
        # ------------- Fin de boucle -------------

    def solve(self, data, container):
        # Recherche du meilleur algorithme
        #bin_algo, pack_algo, sort_algo = self.solveBest(liste, container)

        liste, ids = data

        # Fonctionnement de l'ordonnancement
        packer = newPacker(PackingMode.Offline, bin_algo=self.bin_algo_list[0], pack_algo=self.pack_algo_list[1], sort_algo=self.sort_algo_list[0])
        for i, p in enumerate(liste):
            packer.add_rect(*p, ids[i])
        for c in container:
            packer.add_bin(*c)
        packer.pack() # Lancement de l'algorithme

        #Récupération du container rempli
        width, height = packer[0].width, packer[0].height
        filled_container = packer[0].rect_list()
        return filled_container, [width, height]
        
