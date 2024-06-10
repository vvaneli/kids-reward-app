export default function accessLevelByName(profileItem) {
  if (profileItem.access_level === 4) {
    return 'Youngster'
  } else if (profileItem.access_level === 3) {
    return 'Helper'
  } else if (profileItem.access_level === 2) {
    return 'Elder'
  } else if (profileItem.access_level === 1) {
    return 'Head of this group'
  } else {
    return 'not yet assigned'
  }
}