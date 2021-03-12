import csv

apawn = "w a pawn"
bpawn = "w b pawn"
cpawn = "w c pawn"
dpawn = "w d pawn"
epawn = "w e pawn"
fpawn = "w f pawn"
gpawn = "w g pawn"
hpawn = "w h pawn"
qrook = "w queenside rook"
qknight = "w queenside knight"
qbishop = "w queenside bishop"
queen = "w queen"
king = "w king"
kbishop = "w kingside bishop"
kknight = "w kingside knight"
krook = "w kingside rook"
b_apawn = "b a pawn"
b_bpawn = "b b pawn"
b_cpawn = "b c pawn"
b_dpawn = "b d pawn"
b_epawn = "b e pawn"
b_fpawn = "b f pawn"
b_gpawn = "b g pawn"
b_hpawn = "b h pawn"
b_qrook = "b queenside rook"
b_qknight = "b queenside knight"
b_qbishop = "b queenside bishop"
b_queen = "b queen"
b_king = "b king"
b_kbishop = "b kingside bishop"
b_kknight = "b kingside knight"
b_krook = "b kingside rook"

distances = {
    apawn: 0,
    bpawn: 0,
    cpawn: 0,
    dpawn: 0,
    epawn: 0,
    fpawn: 0,
    gpawn: 0,
    hpawn: 0,
    qrook: 0,
    qknight: 0,
    qbishop: 0,
    queen: 0,
    king: 0,
    kbishop: 0,
    kknight: 0,
    krook: 0,
    b_apawn: 0,
    b_bpawn: 0,
    b_cpawn: 0,
    b_dpawn: 0,
    b_epawn: 0,
    b_fpawn: 0,
    b_gpawn: 0,
    b_hpawn: 0,
    b_qrook: 0,
    b_qknight: 0,
    b_qbishop: 0,
    b_queen: 0,
    b_king: 0,
    b_kbishop: 0,
    b_kknight: 0,
    b_krook: 0
}

with open('chess_distance.csv', newline='') as csvfile:
    for row in csv.DictReader(csvfile):
        if row["Magnus Color"] == "White":
            # print("white")
            distances[apawn] = distances[apawn] + float(row["a pawn"])
            distances[bpawn] = distances[bpawn] + float(row["b pawn"])
            distances[cpawn] = distances[cpawn] + float(row["c pawn"])
            distances[dpawn] = distances[dpawn] + float(row["d pawn"])
            distances[epawn] = distances[epawn] + float(row["e pawn"])
            distances[fpawn] = distances[fpawn] + float(row["f pawn"])
            distances[gpawn] = distances[gpawn] + float(row["g pawn"])
            distances[hpawn] = distances[hpawn] + float(row["h pawn"])
            distances[qrook] = distances[qrook] + float(row["queen-side rook"])
            distances[qknight] = distances[qknight] + float(row["queen-side knight"])
            distances[qbishop] = distances[qbishop] + float(row["queen-side bishop"])
            distances[queen] = distances[queen] + float(row["queen"])
            distances[king] = distances[king] + float(row["king"])
            distances[kbishop] = distances[kbishop] + float(row["king-side bishop"])
            distances[kknight] = distances[kknight] + float(row["king-side knight"])
            distances[krook] = distances[krook] + float(row["king-side rook"])
        else:
            # print("black")
            distances[b_apawn] = distances[b_apawn] + float(row["a pawn"])
            distances[b_bpawn] = distances[b_bpawn] + float(row["b pawn"])
            distances[b_cpawn] = distances[b_cpawn] + float(row["c pawn"])
            distances[b_dpawn] = distances[b_dpawn] + float(row["d pawn"])
            distances[b_epawn] = distances[b_epawn] + float(row["e pawn"])
            distances[b_fpawn] = distances[b_fpawn] + float(row["f pawn"])
            distances[b_gpawn] = distances[b_gpawn] + float(row["g pawn"])
            distances[b_hpawn] = distances[b_hpawn] + float(row["h pawn"])
            distances[b_qrook] = distances[b_qrook] + float(row["queen-side rook"])
            distances[b_qknight] = distances[b_qknight] + float(row["queen-side knight"])
            distances[b_qbishop] = distances[b_qbishop] + float(row["queen-side bishop"])
            distances[b_queen] = distances[b_queen] + float(row["queen"])
            distances[b_king] = distances[b_king] + float(row["king"])
            distances[b_kbishop] = distances[b_kbishop] + float(row["king-side bishop"])
            distances[b_kknight] = distances[b_kknight] + float(row["king-side knight"])
            distances[b_krook] = distances[b_krook] + float(row["king-side rook"])

# print(distances)
with open('distances.csv', 'w') as f:
    for key, value in distances.items():
        row = ("%s,%s\n"%(key, str(value)))
        f.write(row)

