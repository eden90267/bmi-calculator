const getLogs = () => {
  const logs = localStorage.getItem('logs');
  return logs ? JSON.parse(logs) : [];
};

const saveLogs = (logs) => {
  localStorage.setItem('logs', JSON.stringify(logs));
};

export default { getLogs, saveLogs };
