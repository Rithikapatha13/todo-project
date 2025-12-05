function UndoSnackbar({ undoTodo, undoDelete }) {
  if (!undoTodo) return null;

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 backdrop-blur-xl bg-black/70 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-3 text-sm">
      <span>Todo deleted</span>
      <button onClick={undoDelete} className="underline font-medium">
        Undo
      </button>
    </div>
  );
}

export default UndoSnackbar;
