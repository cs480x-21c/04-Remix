library(dplyr)
library(Seurat)
library(ggplot2)

path1 = path.expand("~/GSE97930_FrontalCortex_snDrop-seq_UMI_Count_Matrix_08-01-2017.txt.gz")

matrix = read.table(path1, header=TRUE, row.names=1)

FrontalCortex <- CreateSeuratObject(counts = matrix, project = "Datavis", min.cells = 3, min.features = 200)

FrontalCortex[["percent.mt"]] <- PercentageFeatureSet(FrontalCortex, pattern = "^MT-")

FrontalCortex <- NormalizeData(FrontalCortex, normalization.method = "LogNormalize", scale.factor = 10000)

FrontalCortex <- FindVariableFeatures(object = FrontalCortex)

all_cells <- rownames(FrontalCortex)
FrontalCortex <- ScaleData(FrontalCortex, features = all_cells)

FrontalCortex <- RunPCA(FrontalCortex, features = VariableFeatures(object = FrontalCortex))

FrontalCortex <- FindNeighbors(FrontalCortex, dims = 1:20)
FrontalCortex <- FindClusters(FrontalCortex, resolution = 1)

FrontalCortex <- RunUMAP(FrontalCortex, dims = 1:20, metric="euclidean")

plot = DimPlot(FrontalCortex, reduction = "umap", label = TRUE, pt.size = 0.5) + NoLegend()
ggsave(path.expand("/data/rusers/sheddn/datavis4/umap.png"), device=)

embeddings = as.data.frame(FrontalCortex[["umap"]]@cell.embeddings)
head(embeddings)
embeddings$celltype = Idents(FrontalCortex)

write.table(embeddings, file = path.expand("/data/rusers/sheddn/datavis4/embeddings.txt"), sep=",")

avg_expression_full = t(AverageExpression(FrontalCortex)[["RNA"]])

write.table(avg_expression_full, file ="/data/rusers/sheddn/datavis4/expression_full.txt", sep="\t")
avg_expression_full = read.table("/data/rusers/sheddn/datavis4/expression_full.txt", header=TRUE, row.names=1)

num_clusters = nrow(avg_expression_full)

print(avg_expression_full$SLC17A7)

ex = rowMeans(avg_expression_full[,c("SLC17A7", "SATB2", "GRIN1", "GRIN2B")])
inh = rowMeans(avg_expression_full[,c("GAD1", "GAD2", "SLC6A1")])
oli = rowMeans(avg_expression_full[,c("CLDN11", "MOG", "MOBP", "MBP")])
ast = rowMeans(avg_expression_full[,c("SLC1A2", "SLC1A3", "SLC4A4", "GLUL", "AQP4")])
mic = rowMeans(avg_expression_full[,c("APBB1IP", "P2RY12")])
opc = rowMeans(avg_expression_full[,c("PCDH15", "OLIG1")])
end = rowMeans(avg_expression_full[,c("COBLL1", "DUSP1", "FLT1")])
print(end)

expression = data.frame('cluster'= c(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22),
                            'Excitatory neuron'= ex,
                            'Inhibitory neuron'= inh,
                            'Oligodendrocyte'= oli,
                            'Astrocyte'= ast,
                            'Microglia'= mic,
                            'Oligodendrocyte precursor'= opc,
                            'Endothelial cell'= end)

expression = t(expression)
write.table(expression, file = path.expand("expression.txt"), sep=",")

embeddings_w_expression <- merge(x=embeddings, y=expression, by.x='celltype', by.y='cluster')
head(embeddings_w_expression)

write.table(embeddings_w_expression, file = path.expand("expressionembeddings.txt"), sep=",")
