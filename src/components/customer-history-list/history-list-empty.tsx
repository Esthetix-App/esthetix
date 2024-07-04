

export const HistoryListEmpty = () => {
  return (
    <div className="flex h-full w-full flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
      <div className="flex flex-col items-center gap-1 text-center">
        <h3 className="text-2xl font-bold tracking-tight">
          Você ainda não possui nenhum dado no Histórico"
        </h3>
        <p className="text-sm text-muted-foreground">
          Você pode começar a visualizar assim que haver Histórico.
        </p>
      </div>
    </div>
  );
};
