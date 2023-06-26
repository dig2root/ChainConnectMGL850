from turtle import width

from matplotlib import container


class Utils:

    def convertBoxIntoList(json):
        liste = []
        ids = []
        index = 0
        for element in json: 
            for i in range(0, int(element["quantite"])):
                liste.append((int(element["hauteur"]), int(element["largeur"])))
                ids.append(index)
            index += 1
        return (liste, ids)

    def convertContainerIntoList(json):
        liste = []
        liste.append((int(json["hauteur"]), int(json["largeur"])))
        return (liste)

    def convertJson(container, filled_container):
        respContainer = []
        respContainer.append({
            'width': container[0],
            'height': container[1]
        })
        respBox = []
        for rect in filled_container:
            x, y, w, h, id = rect
            respBox.append({
                'x': x,
                'y': y,
                'w': w,
                'h': h,
                'id': id
            })
        resp = [respContainer, respBox]
        return resp

    def convert3DJson(bin):
        container = []
        container.append({
            'longueur': int(bin.depth),
            'largeur': int(bin.width),
            'hauteur': int(bin.height)
        })
        boxes = []
        for box in bin.items:
            boxes.append({
                'x': int(box.position[0]),
                'y': int(box.position[1]),
                'z': int(box.position[2]),
                'd': int(box.depth),
                'w': int(box.width),
                'h': int(box.height)
            })
        resp = [container, boxes]
        return resp        